import { initialState, onboardingSlice } from "../index";

describe("Onboarding Initial State", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should have correct initial values", () => {
    const state = onboardingSlice.reducer(undefined, { type: "unknown" });

    expect(state).toEqual(initialState);
  });

  it("should have correct step structure", () => {
    const state = onboardingSlice.reducer(undefined, { type: "unknown" });

    expect(state.steps).toEqual({
      general: null,
      role: null,
      details: null,
    });
  });

  it("should have correct loading states", () => {
    const state = onboardingSlice.reducer(undefined, { type: "unknown" });

    expect(state.loadingStates).toEqual({
      general: false,
      role: false,
      details: false,
      confirmation: false,
    });
  });
});
