import { create } from "zustand";
import { persist } from "zustand/middleware";
import { removeAuthCookie } from "../auth/authCookies";
import { ParentDetails, StudentDetails, TeacherDetails } from "../types";

// Define user types
interface User {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  role?: string;
  isVerified?: boolean;
  isOnboarded?: boolean;
  studentDetails?: StudentDetails;
  teacherDetails?: TeacherDetails;
  parentDetails?: ParentDetails;
}

// Define auth store interface
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;

  // Auth actions
  setUser: (user: User) => void;
  setError: (error: string | null) => void;
  signOut: () => void;
  clearError: () => void;
  setLoading: (isLoading: boolean) => void;
}

// Create the auth store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error });
      },

      signOut: async () => {
        // Remove server-side cookie
        await removeAuthCookie("accessToken");
        // You might want to call an API endpoint to invalidate the token
        await removeAuthCookie("refreshToken");
        set({ user: null, isAuthenticated: false });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
