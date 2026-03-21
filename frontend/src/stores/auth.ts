// src/stores/auth.ts
import { create } from "zustand";
import api from "../services/api";

type LoginResponse = {
  success: boolean;
  message: string;
};

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      const { data } = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", data.data.accessToken);

      set({ accessToken: data.data.accessToken });

      return {
        success: true,
        message: "Login successful",
        data,
      };  
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Login failed",
      };
    }
  },

  register: async (name, email, password, confirmPassword) => {
    await api.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
    });
  },

  setAccessToken: (token: string | null) => {
    set({ accessToken: token });
  },

  logout: async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },

  isAuthenticated: () => !!get().accessToken,
}));
