import api from "@/services/api";
import { User } from "@/types";
import {
  SignInValuesType,
  SignUpValuesType,
} from "@/validation/authValidation";
import axios from "axios";

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  signUp: async (credentials: SignUpValuesType): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/signup",
        credentials,
      );
      // No need to set token in headers as it's handled by interceptor
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Sign up failed");
      }
      throw error;
    }
  },

  signIn: async (credentials: SignInValuesType): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/signin",
        credentials,
      );
      // No need to set token in headers as it's handled by interceptor
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Sign in failed");
      }
      throw error;
    }
  },

  fetchAccount: async (): Promise<User> => {
    try {
      const response = await api.get<{ user: User }>("/account/me");
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch account",
        );
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    // No need to clear headers as it's handled by interceptor
    window.location.href = "/auth/signin";
  },
};
