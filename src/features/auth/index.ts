import { apiService } from "@/lib/api";
import {
  AuthResponse,
  SignInCredentials,
  SignUpCredentials,
  User,
  UserRole,
} from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//////////////////////////////////
// Constants

//////////////////////////////////

//////////////////////////////////
// Interfaces
export interface LoadingStates {
  signUp: boolean;
  signIn: boolean;
  verifyEmail: boolean;
  logout: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loadingStates: LoadingStates;
  error: string | null;
}

interface SignUpResponse {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpirations: string;
}
//////////////////////////////////

//////////////////////////////////
// Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loadingStates: {
    signUp: false,
    signIn: false,
    verifyEmail: false,
    logout: false,
  },
  error: null,
};
//////////////////////////////////

//////////////////////////////////
// API Error Handler
const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};
//////////////////////////////////

// 1. Sign Up Thunk
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials: SignUpCredentials, { rejectWithValue }) => {
    try {
      const response = await apiService.post<User>(
        "/auth/sign-up",
        credentials,
      );

      // const responseData = await api.post<AuthResponse>(
      //   "/auth/sign-up",
      //   credentials,
      // );
      // console.log("responseData", responseData);

      // Store token in localStorage or secure storage
      localStorage.setItem("StudyFlowToken", response.data.accessToken);

      console.log("signup response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// 2. Sign In Thunk
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: SignInCredentials, { rejectWithValue }) => {
    try {
      const response = await apiService.post<User>(
        "/auth/sign-in",
        credentials,
      );
      // const response = await api.post<ApiResponse<AuthResponse>>(
      //   "/auth/sign-in",
      //   credentials,
      // );

      // Store token in localStorage or secure storage
      localStorage.setItem("StudyFlowToken", response.data.accessToken);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// 3. Verify Email Thunk
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await apiService.post<AuthResponse>(
        "/auth/verify-email",
        token,
      );
      // const response = await api.post<ApiResponse<User>>("/auth/verify-email", {
      //   token,
      // });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// 4. Resend Verification Email Thunk
export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await apiService.post<AuthResponse>(
        "/auth/sign-up",
        email,
      );
      // const response = await api.post<ApiResponse<{ message: string }>>(
      //   "/auth/resend-verification",
      //   { email },
      // );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// 5. Logout Thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // await api.post("/auth/logout");
      await apiService.post("/auth/logout");

      // Clear token from storage
      localStorage.removeItem("StudyFlowToken");

      return null;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// 6. Check Auth Status (useful for app initialization)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("StudyFlowToken");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await apiService.get<User>("/auth/me");
      // const response = await api.get<ApiResponse<User>>("/auth/me");
      return response.data;
    } catch (error) {
      localStorage.removeItem("StudyFlowToken");
      return rejectWithValue(handleApiError(error));
    }
  },
);

// 7. Update User Role (called after onboarding)
export const updateUserRole = createAsyncThunk(
  "auth/updateUserRole",
  async (role: UserRole, { rejectWithValue }) => {
    try {
      const response = await apiService.patch<User>("/auth/update-role", {
        role,
      });
      // const response = await api.patch<ApiResponse<User>>("/auth/update-role", {
      //   role,
      // });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Synchronous actions
    clearError: (state) => {
      state.error = null;
    },
    setOnboardingComplete: (state) => {
      if (state.user) {
        state.user.hasCompletedOnboarding = true;
      }
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loadingStates.signUp = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loadingStates.signUp = false;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loadingStates.signUp = false;
        state.error = action.payload as string;
      })

      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loadingStates.signIn = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loadingStates.signIn = false;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loadingStates.signIn = false;
        state.error = action.payload as string;
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loadingStates.verifyEmail = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        if (state.user) {
          state.user.isEmailVerified = true;
        }
        state.loadingStates.verifyEmail = false;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loadingStates.verifyEmail = false;
        state.error = action.payload as string;
      })

      // Resend Verification
      .addCase(resendVerification.pending, (state) => {
        state.loadingStates.verifyEmail = true;
        state.error = null;
      })
      .addCase(resendVerification.fulfilled, (state) => {
        state.loadingStates.verifyEmail = false;
        state.error = null;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.loadingStates.verifyEmail = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loadingStates.logout = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        return initialState; // Reset entire state to initial values
      })
      .addCase(logout.rejected, (state, action) => {
        state.loadingStates.logout = false;
        state.error = action.payload as string;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loadingStates.signIn = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loadingStates.signIn = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        return initialState; // Reset state if auth check fails
      })

      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.loadingStates.signIn = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        if (state.user) {
          state.user.role = action.payload.role;
        }
        state.loadingStates.signIn = false;
        state.error = null;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loadingStates.signIn = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, setOnboardingComplete, resetAuth } =
  authSlice.actions;

// Export reducer
export default authSlice.reducer;
