import { authSlice } from "@/redux/features/auth";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import { onboardingSlice } from "../features/onboarding";
// import { api } from "./api";

// const rootReducer = combineReducers({

//   // localizationSlice: localizationSlice.reducer,

// });

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    onboarding: onboardingSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
