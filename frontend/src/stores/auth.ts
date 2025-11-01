// src/store/authStore.ts
import { create } from "zustand";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setTokens: (access: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // STATE
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,

  // ACTIONS
  setTokens: (access) => {
    localStorage.setItem("accessToken", access);
    set({ accessToken: access });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const { data } = await api.post("/auth/login", { email, password });
      const user = data.user;
      const accessToken = data.accessToken;

      // localStorage.setItem("accessToken", accessToken);

      set({ user, accessToken });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Login Failed",
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null, user: null });
  },
}));
