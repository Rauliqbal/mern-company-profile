import { create } from "zustand";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      set({ user: data.user, token: data.token, loading: false });
      localStorage.setItem("token", data.token);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      set({ user: data.user, token: data.token, loading: false });
      localStorage.setItem("token", data.token);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Register failed",
        loading: false,
      });
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },
}));
