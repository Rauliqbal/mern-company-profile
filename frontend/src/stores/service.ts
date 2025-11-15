import api from "@/services/api";
import { create } from "zustand";

interface Service {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface StoreState {
  services: Service[];
  isLoading: boolean;
  fetchService: () => Promise<void>;
  createService: (formData: FormData) => Promise<void>;
}

export const useServiceStore = create<StoreState>((set) => ({
  // STATE
  services: [],
  isLoading: true,

  // ACTIONS
  fetchService: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/service");

      set({ services: data.data, isLoading: false });
    } catch (error) {
      console.log(error);
      // set({ isLoading: false });
    }
  },

  createService: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post("/service", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ service: data.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
}));
