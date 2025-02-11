import { refreshToken, signOut } from "@/store/slices/authSlice";
import { store } from "@/store/store";
import { clearToken, getStoredToken, persistRefreshToken } from "@/utils/auth";
import axios from "axios";

// Set the API URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : `${process.env.NEXT_PUBLIC_CORS_PROXY_DEV}${process.env.NEXT_PUBLIC_API_URL_DEV}`;

console.log("apiUrl", apiUrl);

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Get the refresh token from the response
        const refreshToken = error.response.headers["refresh-token"];

        // Attempt to refresh the token if 401 is encountered
        const refreshedData = await refreshToken(refreshToken);

        // Store the new token in local storage and update Redux state
        persistRefreshToken(refreshedData.accessToken);

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${refreshedData.accessToken}`;

        return api.request(error.config); // Retry the failed request
      } catch (refreshError) {
        // If refresh fails, clear the token and redirect to sign-in page
        clearToken();
        store.dispatch(signOut()); // Clear Redux auth state
        window.location.href = "/sign-in"; // Redrect to sign-in page
      }
    }
    return Promise.reject(error);
  },
);

export default api;
