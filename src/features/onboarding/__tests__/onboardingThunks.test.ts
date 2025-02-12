import { submitGeneralInfo } from "@/app/[locale]/onboarding/general/action";
import { UserRole } from "@/types";
import {
  submitConfirmation,
  submitRoleSelection,
  submitStudentDetails,
} from "../index";
import {
  createApiResponse,
  createTestStore,
  mockedApi,
  mockGeneralInfo,
  mockStudentDetails,
} from "./setup";

describe("Onboarding Thunks", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("submitGeneralInfo", () => {
    it("should handle successful submission", async () => {
      // Arrange
      const store = createTestStore();
      mockedApi.patch.mockResolvedValueOnce({
        data: createApiResponse(mockGeneralInfo),
      });

      // Act
      await store.dispatch(submitGeneralInfo(mockGeneralInfo));
      const state = store.getState().onboarding;

      // Assert
      expect(mockedApi.patch).toHaveBeenCalledWith(
        "/oboarding/general",
        mockGeneralInfo,
      );
      expect(state.steps.general).toEqual(mockGeneralInfo);
      expect(state.currentStep).toBe(2);
      expect(state.loadingStates.general).toBe(false);
      expect(state.error).toBeNull();
    });

    it("should handle API error", async () => {
      // Arrange
      const store = createTestStore();
      const errorMessage = "API Error";
      mockedApi.patch.mockRejectedValueOnce(new Error(errorMessage));

      // Act
      await store.dispatch(submitGeneralInfo(mockGeneralInfo));
      const state = store.getState().onboarding;

      // Assert
      expect(state.loadingStates.general).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.steps.general).toBeNull();
      expect(state.currentStep).toBe(1);
    });

    it("should set loading state during submission", async () => {
      // Arrange
      const store = createTestStore();
      mockedApi.patch.mockResolvedValueOnce(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      // Act
      store.dispatch(submitGeneralInfo(mockGeneralInfo));
      const stateWhileLoading = store.getState().onboarding;

      // Assert
      expect(stateWhileLoading.loadingStates.general).toBe(true);
      expect(stateWhileLoading.error).toBeNull();
    });
  });

  describe("submitRoleSelection", () => {
    const mockRole: UserRole = "student";

    it("should handle successful role submission", async () => {
      // Arrange
      const store = createTestStore();
      mockedApi.patch.mockResolvedValueOnce({
        data: createApiResponse(mockRole),
      });

      // Act
      await store.dispatch(submitRoleSelection(mockRole));
      const state = store.getState().onboarding;

      // Assert
      expect(mockedApi.patch).toHaveBeenCalledWith(
        "/onboarding/role",
        mockRole,
      );
      expect(state.steps.role).toBe(mockRole);
      expect(state.currentStep).toBe(2);
      expect(state.loadingStates.role).toBe(false);
      expect(state.error).toBeNull();
    });

    it("should handle API error", async () => {
      // Arrange
      const store = createTestStore();
      const errorMessage = "API Error";
      mockedApi.patch.mockRejectedValueOnce(new Error(errorMessage));

      // Act
      await store.dispatch(submitRoleSelection(mockRole));
      const state = store.getState().onboarding;

      // Assert
      expect(state.loadingStates.role).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.steps.role).toBeNull();
      expect(state.currentStep).toBe(1);
    });

    it("should set loading state during submission", async () => {
      // Arrange
      const store = createTestStore();
      mockedApi.patch.mockResolvedValueOnce(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      // Act
      store.dispatch(submitRoleSelection(mockRole));
      const stateWhileLoading = store.getState().onboarding;

      // Assert
      expect(stateWhileLoading.loadingStates.role).toBe(true);
      expect(stateWhileLoading.error).toBeNull();
    });
  });

  describe("submitStudentDetails", () => {
    it("should handle successful student data submission", async () => {
      // Arrange
      const store = createTestStore();
      mockedApi.patch.mockResolvedValueOnce({
        data: createApiResponse(mockStudentDetails),
      });

      // Act
      await store.dispatch(submitStudentDetails(mockStudentDetails));
      const state = store.getState().onboarding;

      // Assert
      expect(mockedApi.patch).toHaveBeenCalledWith(
        "/onboarding/student",
        mockStudentDetails,
      );
      expect(state.steps.details).toEqual(mockStudentDetails);
      expect(state.loadingStates.details).toBe(false);
      expect(state.currentStep).toBe(4);
      expect(state.error).toBeNull();
    });

    it("should handle API error", async () => {
      // Arrange
      const store = createTestStore();
      const errorMessage = "API Error";
      mockedApi.patch.mockRejectedValueOnce(new Error(errorMessage));

      // Act
      await store.dispatch(submitStudentDetails(mockStudentDetails));
      const state = store.getState().onboarding;

      // Assert
      expect(state.loadingStates.details).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.steps.details).toBeNull();
      expect(state.currentStep).toBe(3);
    });

    it("should set loading state during submission", async () => {
      // Arrange
      const store = createTestStore();
      mockedApi.patch.mockResolvedValueOnce(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      // Act
      store.dispatch(submitStudentDetails(mockStudentDetails));
      const stateWhileLoading = store.getState().onboarding;

      // Assert
      expect(stateWhileLoading.loadingStates.details).toBe(true);
      expect(stateWhileLoading.error).toBeNull();
    });
  });

  describe("submitConfirmation", () => {
    it("should handle successful submission", async () => {
      // Arrange
      const store = createTestStore();
      mockedApi.patch.mockResolvedValueOnce({
        data: createApiResponse(true),
      });

      // Act
      await store.dispatch(submitConfirmation(true));
      const state = store.getState().onboarding;

      // Assert
      expect(mockedApi.patch).toHaveBeenCalledWith(
        "/onboarding/confirmation",
        true,
      );
      expect(state.isSubmitted).toBe(true);
      expect(state.loadingStates.confirmation).toBe(false);
      expect(state.error).toBeNull();
    });

    // TODO: Add tests for error and loading states
  });
});
