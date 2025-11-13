import api from "@/services/api";
import { create } from "zustand";

interface Service {
  id: string;
  title: string;
  image_url: string;
}

interface StoreState {
  service: Service[] | null;
  isLoading: boolean;
  fetchService: () => Promise<void>;
}

export const useServiceStore = create<StoreState>((set) => ({
  // STATE
  service: null,
  isLoading: false,

  // ACTIONS
  fetchService: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/service");

      set({ service: data.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
}));
