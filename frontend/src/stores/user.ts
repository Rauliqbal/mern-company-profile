import { create } from "zustand";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

type CreateUserResponse = {
  success: boolean;
  message: string
}

interface UserState {
  user: User | null;
  allUsers: User[];
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  fetchAllUser: () => Promise<void>;
  createUser: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<ApiResponse>;
  updateUser: (
    id: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<ApiResponse>;
  deleteUser: (id: string) => Promise<ApiResponse>
}

export const useUserStore = create<UserState>((set) => ({
  // STATE
  user: null,
  allUsers: [],
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
      set({ allUsers: data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  createUser: async (name, email, password, confirmPassword) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      set((state) => ({
        allUsers: [data.data, ...state.allUsers],
      }));

      return {
        success: true,
        message: data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Create user failed",
      };
    }
  },

  updateUser: async (id: string, payload: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    set({ isLoading: true })
    try {
      const { data } = await api.patch(`/user/${id}`, payload);

      set((state) => ({
        allUsers: state.allUsers.map((user) =>
          user.id === id ? data.data : user
        ),
        isLoading: false,
      }));

      return {
        success: true,
        message: data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Update user failed",
      };
    }
  },

  deleteUser: async (id: string) => {
    try {
      await api.delete(`/user/${id}`);

      set((state) => ({
        allUsers: state.allUsers.filter((user) => user.id !== id),
      }));

      return { success: true, message: "User deleted successfully" };
    } catch (error: any) {
      return { success: false, message: error?.response?.data?.message || "Failed to delete user" };
    }
  },

}));
