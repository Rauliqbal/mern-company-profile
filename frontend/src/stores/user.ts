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
}

export const useUserStore = create<UserState>((set) => ({
  // STATE
  user: null,

  // ACTIONS
  getUser: async () => {
    try {
      const { data } = await api.get("/user");

      set({ user: data.user });
    } catch (error) {
      console.log(error);
    }
  },
}));
