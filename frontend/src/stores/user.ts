import { create } from "zustand";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  user: User | null;
  allUsers: User[];
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  fetchAllUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  // STATE
  user: null,
  allUsers:[],
  isLoading: false,

  // ACTIONS
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/user");

      set({ user: data.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },

  fetchAllUser: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/user/all");
      // Simpan ke allUsers, bukan ke user
      set({ allUsers: data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  }
}));
