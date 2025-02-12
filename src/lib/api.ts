import { logout } from "@/features/auth";
import { store } from "@/store/store";
import { clearToken, getStoredToken, persistRefreshToken } from "@/utils/auth";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

// Set the API URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : `${process.env.NEXT_PUBLIC_CORS_PROXY_DEV}${process.env.NEXT_PUBLIC_API_URL_DEV}`;

console.log("apiUrl", apiUrl);

// Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    // const token = localStorage.getItem("StudyFlowToken");

    // // If token exists, add to headers
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    console.log("config", config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // If token expired or invalid, logout user
      store.dispatch(logout());
      return Promise.reject(error);
    }

    // Handle 422 Validation errors
    if (error.response?.status === 422) {
      const validationErrors = error.response.data.errors;
      return Promise.reject({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: "Network error occurred. Please check your connection.",
      });
    }

    // Handle other errors
    return Promise.reject({
      message: error.response.data.message || "An unexpected error occurred",
      status: error.response.status,
    });
  },
);

// API wrapper functions
export const apiService = {
  get: async <T>(url: string) => {
    try {
      const response = await api.get<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  post: async <T>(url: string, data?: unknown) => {
    try {
      console.log({
        url,
        data,
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_DEV}${url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      // const response = await api.post<ApiResponse<T>>(url, data);
      // return response.data;

      // interface Res {
      //   id: string;
      //   accessToken: string;
      //   refreshToken: string;
      //   expiresIn: number;
      //   refreshTokenExpirations: string;
      // }

      const responseData = await response.json();

      const returnData: ApiResponse<T> = {
        data: responseData,
        message: "success",
        status: 200,
      };
      console.log("returnData", returnData);
      return returnData;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  patch: async <T>(url: string, data?: unknown) => {
    try {
      const response = await api.patch<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  put: async <T>(url: string, data?: unknown) => {
    try {
      const response = await api.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async <T>(url: string) => {
    try {
      const response = await api.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Error handler
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    const axiosError = error as AxiosError<ApiError>;

    if (!axiosError.response) {
      return new Error("Network error occurred");
    }

    const errorMessage =
      axiosError.response.data.message || "An unexpected error occurred";
    const errorStatus = axiosError.response.status;

    return {
      message: errorMessage,
      status: errorStatus,
      errors: axiosError.response.data.errors,
    };
  }

  // Handle other errors
  return new Error("An unexpected error occurred");
};
