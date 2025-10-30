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
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setTokens: (access: string, refresh: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,

  setTokens: (access) => {
    localStorage.setItem("accessToken", access);
    set({ accessToken: access });
  },

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const user = res.data.data.user;
    const accessToken = res.data.data.accessToken;

    localStorage.setItem("accessToken", accessToken);

    set({ user, accessToken });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null, user: null });
  },
}));
