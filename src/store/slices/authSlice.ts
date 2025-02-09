// store/slices/authSlice.ts
import { authService } from "@/services/authService";
import { User } from "@/types";
import {
  SignInValuesType,
  SignUpValuesType,
} from "@/validation/authValidation";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  error: null,
  loading: false,
};

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (credentials: SignUpValuesType, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(credentials);

      // Store token
      localStorage.setItem("token", response.token);
      // Token will be automatically added to subsequent requests by interceptor

      return {
        user: response.user,
        token: response.token,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (credentials: SignInValuesType, { rejectWithValue }) => {
    try {
      const response = await authService.signIn(credentials);

      // Store token
      localStorage.setItem("token", response.token);
      // Token will be automatically added to subsequent requests by interceptor

      return {
        user: response.user,
        token: response.token,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const fetchUserAccount = createAsyncThunk(
  "auth/fetchUserAccount",
  async (_, { rejectWithValue }) => {
    try {
      // Token will be automatically added by interceptor
      const user = await authService.fetchAccount();
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch user account");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      authService.logout();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(fetchUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        // Let the interceptor handle the redirect if needed
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
