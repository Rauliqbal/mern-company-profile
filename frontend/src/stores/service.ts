import api from "@/services/api";
import { create } from "zustand";

interface Service {
  id: string;
  title: string;
  image_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface StoreState {
  services: Service[] | null;
  serviceDetail: Service | null;
  isLoading: boolean;
  fetchService: () => Promise<void>;
  detailService: (id: string) => Promise<void>;
  createService: (formData: FormData) => Promise<void>;
  updateService: (id: string, formData: FormData) => Promise<void>;
}

export const useServiceStore = create<StoreState>((set) => ({
  // STATE
  services: [],
  serviceDetail: null,
  isLoading: true,

  // ACTIONS
  fetchService: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/service");

      set({ services: data.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
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

      set({ services: data.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },

  detailService: async (id: string) => {
    set({ isLoading: true });

    try {
      const { data } = await api.get(`/service/${id}`);

      set({ serviceDetail: data.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },

  updateService: async (id: string, formData: FormData) => {
    set({ isLoading: true });
    try {
      const { data } = await api.put(`/service/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ services: data.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
}));
