import { create } from "zustand";
import axios from "../lib/axios";
import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  fetchUser: () => Promise<void>;
  logout: () => void;
}
interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: string; 
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  fetchUser: async () => {
    try {
      const res = await axios.get<UserResponse>("/auth/me", {
        withCredentials: true,
      });
      const user = {
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      };
      set({ user });
      console.log("Fetched user:", user);
    } catch (error) {
      set({ user: null });
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      set({ user: null });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
}));
