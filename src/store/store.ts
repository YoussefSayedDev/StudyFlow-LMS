import { authSlice } from "@/features/auth";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { onboardingSlice } from "../features/onboarding";
// import { api } from "./api";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  onboarding: onboardingSlice.reducer,
  // localizationSlice: localizationSlice.reducer,
  // [apit.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
