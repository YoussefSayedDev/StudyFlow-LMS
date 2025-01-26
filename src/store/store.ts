import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// Import slices here

export const store = configureStore({
  reducer: {
    // Add reducers here
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
