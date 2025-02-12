import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { handleClientScriptLoad } from "next/script";
import { LoadingStates } from ".";

// Basic Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectError = (state: RootState) => state.auth.error;
export const selectLoadingStates = (state: RootState) =>
  state.auth.loadingStates;

// Specific Loading State Selector
export const selectLoadingState = (key: keyof LoadingStates) =>
  createSelector(selectLoadingStates, (loadingStates) => loadingStates[key]);

// User-related Selectors
export const selectUsername = createSelector(
  selectUser,
  (user) => user?.username ?? null,
);

export const selectUserEmail = createSelector(
  selectUser,
  (user) => user?.email ?? null,
);

export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.role ?? null,
);

// Verification Status Selectors
export const selectIsEmailVerified = createSelector(
  selectUser,
  (user) => user?.isEmailVerified ?? false,
);

export const selectHasCompletedOnboarding = createSelector(
  selectUser,
  (user) => user?.hasCompletedOnboarding ?? false,
);

// Combined Status Selectors
export const selectCanStartOnboarding = createSelector(
  [selectIsAuthenticated, selectIsEmailVerified, selectHasCompletedOnboarding],
  (isAuthenticated, isEmailVerified, hasCompletedOnboarding) =>
    isAuthenticated && isEmailVerified && !hasCompletedOnboarding,
);

export const selectCanAccessDashboard = createSelector(
  [selectIsAuthenticated, selectHasCompletedOnboarding],
  (isAuthenticated, hasCompletedOnboarding) =>
    isAuthenticated && hasCompletedOnboarding,
);

// Auth Status Selectors
export const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectIsEmailVerified, selectHasCompletedOnboarding],
  (isAuthenticated, isEmailVerified, hasCompletedOnboarding) => ({
    isAuthenticated,
    isEmailVerified,
    hasCompletedOnboarding,
  }),
);

// Error and Loading Combined Selector
export const selectAuthUIState = createSelector(
  [selectError, selectLoadingStates],
  (error, loadingStates) => ({
    error,
    isLoading: Object.values(loadingStates).some(Boolean),
    loadingStates,
  }),
);

// Naigation Guard Selectors
export const selectShouldRedirectToVerification = createSelector(
  [selectIsAuthenticated, selectIsEmailVerified],
  (isAuthenticated, isEmailVerified) => isAuthenticated && !isEmailVerified,
);

export const selectShouldRedirectToOnboarding = createSelector(
  [selectIsAuthenticated, selectIsEmailVerified, selectHasCompletedOnboarding],
  (isAuthenticated, isEmailVerified, hasCompletedOnboarding) =>
    isAuthenticated && isEmailVerified && !hasCompletedOnboarding,
);

// User Status Selector
export const selectUserStatus = createSelector(
  [selectUser, selectAuthStatus],
  (user, authStatus) => ({
    user,
    ...authStatus,
    isComplete: user !== null && authStatus.hasCompletedOnboarding,
  }),
);
