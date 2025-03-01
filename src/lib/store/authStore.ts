import { create } from "zustand";

type User = {
  id: string;
  role: string | null;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  accessToken: string;
  refreshToken: string;
};

interface AuthState {
  user: User | null;
  // setUser: (user: User) => void;
  signUp: (user: {
    id: string;
    accessToken: string;
    refreshToken: string;
  }) => void;
  signIn: (user: User) => void;
  logout: () => void;
}

// Check localStorage for persisted user
const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getUserFromLocalStorage(),
  signUp: (userData) => {
    set({
      user: {
        id: userData.id,
        role: null,
        firstName: null,
        userName: null,
        lastName: null,
        email: null,
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
      },
    });
  },
  signIn: (userData) => {
    console.log("userData from signIn fn:", userData)
    set({
      user: {
        id: userData.id,
        role: userData.role,
        firstName: userData.firstName,
        userName: userData.userName,
        lastName: userData.lastName,
        email: userData.email,
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
      },
    });
  },
  logout: () => {
    set({ user: null });
  },
}));
