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
  isLoading: boolean;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  // STATE
  user: null,
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
}));
