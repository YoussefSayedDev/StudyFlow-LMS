import { RootState } from "@/store/store";
import { UserRole } from "@/types";
import {
  initialState,
  ONBOARDING_STEPS,
  selectCurrentStep,
  selectCurrentStepData,
  selectDetails,
  selectError,
  selectGeneralInfo,
  selectIsComplete,
  selectIsStepComplete,
  selectLoadingState,
  selectRole,
} from "../index";
import { mockGeneralInfo, mockStudentDetails } from "./setup";

const auth = {
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

describe("Onboarding Selectors", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("Basic Selectors", () => {
    it("should select current step", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          currentStep: 2,
        },
        auth,
      };

      // Act
      const result = selectCurrentStep(state);

      // Assert
      expect(result).toBe(2);
    });

    it("should select loading state for specific step", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          loadingStates: {
            ...initialState.loadingStates,
            general: true,
          },
        },
        auth,
      };

      // Act
      const result = selectLoadingState("general")(state);

      // Assert
      expect(result).toBe(true);
    });

    it("should select error state", () => {
      // Arrange
      const errorMessage = "Test error";
      const state: RootState = {
        onboarding: {
          ...initialState,
          error: errorMessage,
        },
        auth,
      };

      // Act
      const result = selectError(state);

      // Assert
      expect(result).toBe(errorMessage);
    });

    it("should select completion status", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          isSubmitted: true,
        },
        auth,
      };

      // Act
      const result = selectIsComplete(state);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Step Data Selectors", () => {
    it("should select general info", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          steps: {
            ...initialState.steps,
            general: mockGeneralInfo,
          },
        },
        auth,
      };

      // Act
      const result = selectGeneralInfo(state);

      // Assert
      expect(result).toEqual(mockGeneralInfo);
    });

    it("should select role", () => {
      // Arrange
      const role: UserRole = "student";
      const state: RootState = {
        onboarding: {
          ...initialState,
          steps: {
            ...initialState.steps,
            role: role,
          },
        },
        auth,
      };

      // Act
      const result = selectRole(state);

      // Assert
      expect(result).toBe(role);
    });

    it("should select details", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          steps: {
            ...initialState.steps,
            details: mockStudentDetails,
          },
        },
        auth,
      };

      // Act
      const result = selectDetails(state);

      // Assert
      expect(result).toEqual(mockStudentDetails);
    });
  });

  describe("Step Completion Selector", () => {
    it("should correctly identify completed general info step", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          steps: {
            ...initialState.steps,
          },
        },
        auth,
      };

      // Act
      const result = selectIsStepComplete(ONBOARDING_STEPS.GENERAL)(state);

      // Assert
      expect(result).toBe(true);
    });

    it("should correctly identify incomplete role step", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          steps: {
            ...initialState.steps,
            role: null,
          },
        },
        auth,
      };

      // Act
      const result = selectIsStepComplete(ONBOARDING_STEPS.ROLE)(state);

      // Assert
      expect(result).toBe(false);
    });

    it("should correctly identify completed details step", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          steps: {
            ...initialState.steps,
            details: mockStudentDetails,
          },
        },
        auth,
      };

      // Act
      const result = selectIsStepComplete(ONBOARDING_STEPS.DETAILS)(state);

      // Assert
      expect(result).toBe(true);
    });

    it("should correctly identify completed confirmation step", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          isSubmitted: true,
        },
        auth,
      };

      // Act
      const result = selectIsStepComplete(ONBOARDING_STEPS.CONFIRMATION)(state);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("Current Step Data Selector", () => {
    it("should select general info for step 1", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          currentStep: 1,
          steps: {
            ...initialState.steps,
            general: mockGeneralInfo,
          },
        },
        auth,
      };

      // Act
      const result = selectCurrentStepData(state);

      // Assert
      expect(result).toEqual(mockGeneralInfo);
    });

    it("should select role for step 2", () => {
      // Arrange
      const role: UserRole = "student";
      const state: RootState = {
        onboarding: {
          ...initialState,
          currentStep: 2,
          steps: {
            ...initialState.steps,
            role,
          },
        },
        auth,
      };

      // Act
      const result = selectCurrentStepData(state);

      // Assert
      expect(result).toEqual(role);
    });

    it("should select details for step 3", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          currentStep: 3,
          steps: {
            ...initialState.steps,
            details: mockStudentDetails,
          },
        },
        auth,
      };

      // Act
      const result = selectCurrentStepData(state);

      // Assert
      expect(result).toEqual(mockStudentDetails);
    });

    it("sholud return null for invalid step", () => {
      // Arrange
      const state: RootState = {
        onboarding: {
          ...initialState,
          currentStep: 5, // Invalid step
        },
        auth,
      };

      // Act
      const result = selectCurrentStepData(state);

      // Assert
      expect(result).toBeNull();
    });
  });
});
