import { useAuthStore } from "@/lib/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ParentDetails, StudentDetails, TeacherDetails } from "../types";
import { setAuthCookie } from "./authCookies";

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

interface VerifyEmailApi {
  userId: string;
  code: string;
}

interface AuthResponse {
  data: {
    id: string;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    role?: string;
    studentDetails?: StudentDetails;
    teacherDetails?: TeacherDetails;
    parentDetails?: ParentDetails;
  };
  message: string;
  status: number;
}

// Create axios instance with base URL from environment variables
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired, try refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Request new access token using refresh token
        // TODO:  based on what the response form but for now simulate it as { data, message, status }
        const response = await api.get("/auth/refresh-token", {
          withCredentials: true,
        });

        // Implement token refresh logic here
        const { user } = useAuthStore.getState();

        if (user && response.status === 200) {
          useAuthStore.getState().setUser({
            ...user,
            accessToken: response.data,
          });
          originalRequest.headers.Authorization = `Bearer ${response.data}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout user)
        useAuthStore.getState().signOut();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

// Sign In API call
const signInApi = async (
  credentials: SignInCredentials,
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/sign-in", credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Sign in failed");
    }
    throw error;
  }
};

// Sign Up API call
const signUpApi = async (userData: SignUpData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/sign-up", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Sign up failed");
    }
    throw error;
  }
};

// Email verification API call
const verifyEmailApi = async (data: VerifyEmailApi): Promise<AuthResponse> => {
  try {
    const response = await api.post("/auth/verify-email", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Email verification failed",
      );
    }
    throw error;
  }
};

// React Query hooks
export const useSignInMutation = () => {
  const { setUser, setError } = useAuthStore();

  return useMutation({
    mutationFn: signInApi,
    onSuccess: async (data) => {
      // Set HttpOnly cookie via server action
      await setAuthCookie("accessToken", data.data.accessToken);
      // // Also set refresh token in cookies
      await setAuthCookie("refreshToken", data.data.refreshToken);

      // Set user role hardcoded until the backend send it from the response
      setUser({
        ...data.data,
        role: "student",
      });
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
};

export const useSignUpMutation = () => {
  const { setUser, setError } = useAuthStore();

  return useMutation({
    mutationFn: signUpApi,
    onSuccess: async (data) => {
      // Set HttpOnly cookie via server action
      await setAuthCookie("accessToken", data.data.accessToken);
      setUser(data.data);
      // Set refresh token in cookies
      await setAuthCookie("refreshToken", data.data.refreshToken);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
};

export const useVerifyEmailMutation = () => {
  const { setUser, setError } = useAuthStore();

  return useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: (data) => {
      // Update user with verified status
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser({
          ...currentUser,
          isVerified: true,
        });
      }
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
};
