import { UserRole } from "@/types";
import { initialState, onboardingSlice } from "../index";
import { createTestStore, mockGeneralInfo } from "./setup";

describe("Onboarding Reducers", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  describe("nextStep", () => {
    it("should increment step when conditions are met", () => {
      // Arrange
      const initialStateWithGeneralInfo = {
        ...initialState,
        steps: {
          ...initialState.steps,
          general: mockGeneralInfo,
        },
      };
      const store = createTestStore(initialStateWithGeneralInfo);

      // Act
      store.dispatch(onboardingSlice.actions.nextStep());

      // Assert
      expect(store.getState().onboarding.currentStep).toBe(2);
    });

    it("should not increment step when at max steps", () => {
      // Arrange
      const maxStepState = {
        ...initialState,
        currentStep: 4,
      };
      const store = createTestStore(maxStepState);

      // Act
      store.dispatch(onboardingSlice.actions.nextStep());

      // Assert
      expect(store.getState().onboarding.currentStep).toBe(4);
    });

    it("should not increment step when current step is incomplete", () => {
      // Arrange
      const store = createTestStore();

      // Act
      store.dispatch(onboardingSlice.actions.nextStep());

      // Assert
      expect(store.getState().onboarding.currentStep).toBe(1);
    });
  });

  describe("prevStep", () => {
    it("should decrement step when not at first step", () => {
      // Arrange
      const stateAtStep2 = {
        ...initialState,
        currentStep: 2,
      };
      const store = createTestStore(stateAtStep2);

      // Act
      store.dispatch(onboardingSlice.actions.prevStep());

      // Assert
      expect(store.getState().onboarding.currentStep).toBe(1);
    });

    it("should not decrement step when at first step", () => {
      // Arrange
      const store = createTestStore();

      // Act
      store.dispatch(onboardingSlice.actions.prevStep());

      // Assert
      expect(store.getState().onboarding.currentStep).toBe(1);
    });
  });

  describe("setRole", () => {
    it("should set role correctly", () => {
      // Arrange
      const store = createTestStore();
      const role: UserRole = "student";

      // Act
      store.dispatch(onboardingSlice.actions.setRole(role));

      // Assert
      expect(store.getState().onboarding.steps.role).toBe(role);
    });
  });

  describe("resetOnboarding", () => {
    it("should reset to initial values", () => {
      // Arrange
      const modifiedState = {
        ...initialState,
        currentStep: 3,
        steps: {
          ...initialState.steps,
          general: mockGeneralInfo,
          role: "student" as UserRole,
        },
      };
      const store = createTestStore(modifiedState);

      // Act
      store.dispatch(onboardingSlice.actions.resetOnboarding());

      // Assert
      expect(store.getState().onboarding).toEqual(initialState);
    });
  });
});
