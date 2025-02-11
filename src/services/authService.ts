import api from "@/lib/api";
import { User } from "@/types";
import {
  clearRefreshToken,
  clearToken,
  getStoredRefreshToken,
} from "@/utils/auth";
import {
  SignInValuesType,
  SignUpValuesType,
} from "@/validation/authValidation";
import axios from "axios";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpiration: string;
}

export const authService = {
  signUp: async (credentials: SignUpValuesType): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        "/auth/sign-up",
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
        "/auth/sign-in",
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

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    try {
      // Send the refresh token to your backend to get a new access token
      const response = await api.post<AuthResponse>("/auth/refresh-token", {
        refreshToken,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Token refresh failed",
        );
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
    // Remove token and any other authentication-related data from localStorage
    clearToken();
    clearRefreshToken();

    // Redirect to sign-in page
    window.location.href = "/sign-in";
  },
};
