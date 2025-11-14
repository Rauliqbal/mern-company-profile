import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { config } from "@/config";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api` || "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach accessToken
api.interceptors.request.use((config) => {
  const token =
    useAuthStore.getState().accessToken || localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto refresh token if expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore.getState();

    // if unauthorized (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${
            config.API_URL || "http://localhost:8000/api"
          }/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = data.data?.accessToken || data.data.accessToken;
        if (!newAccessToken)
          throw new Error("No access token returned from refresh");

        // Update store + localStorage
        authStore.setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);

        // Update Authorization header dan retry request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // if refresh failed, logout user
        authStore.logout();
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
