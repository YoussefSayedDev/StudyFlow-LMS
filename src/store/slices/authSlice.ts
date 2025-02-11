import { authService } from "@/services/authService";
import { Id, User } from "@/types";
import {
  getStoredRefreshToken,
  getStoredToken,
  persistToken,
} from "@/utils/auth";
import {
  SignInValuesType,
  SignUpValuesType,
} from "@/validation/authValidation";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  id: Id;
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number;
  refreshTokenExpiration: string;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  id: "",
  accessToken: getStoredToken(),
  refreshToken: getStoredRefreshToken(),
  expiresIn: 0,
  refreshTokenExpiration: "",
  isAuthenticated: !!getStoredToken(),
  error: null,
  loading: false,
};

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (credentials: SignUpValuesType, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(credentials);

      // Store token
      persistToken(response.accessToken);
      // Access token will be automatically added to subsequent requests by interceptor

      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        refreshTokenExpiration: response.refreshTokenExpiration,
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
      localStorage.setItem("token", response.accessToken);
      // Token will be automatically added to subsequent requests by interceptor

      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        refreshTokenExpiration: response.refreshTokenExpiration,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken(refreshToken);

      // Store token
      persistToken(response.accessToken);
      // Access token will be automatically added to subsequent requests by interceptor

      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        refreshTokenExpiration: response.refreshTokenExpiration,
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
    signOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = 0;
      state.refreshTokenExpiration = "";
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
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.expiresIn = action.payload.expiresIn;
        state.refreshTokenExpiration = action.payload.refreshTokenExpiration;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.expiresIn = action.payload.expiresIn;
        state.refreshTokenExpiration = action.payload.refreshTokenExpiration;
        state.isAuthenticated = true;
        state.error = null;

        //
        console.log({
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          expiresIn: action.payload.expiresIn,
          refreshTokenExpiration: action.payload.refreshTokenExpiration,
        });
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { signOut, clearError } = authSlice.actions;
export default authSlice.reducer;
