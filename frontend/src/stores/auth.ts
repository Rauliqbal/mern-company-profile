// src/stores/auth.ts
import { create } from "zustand";
import api from "../services/api";

interface AuthState {
  accessToken: string | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken"),
  loading: false,

  login: async (email, password) => {
    const { data } = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    localStorage.setItem("accessToken", data.data.accessToken);
    set({ accessToken: data.data.accessToken });
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
