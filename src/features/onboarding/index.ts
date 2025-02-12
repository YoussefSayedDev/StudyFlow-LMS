import api from "@/lib/api";
import { RootState } from "@/store/store";
import {
  ApiResponse,
  GeneralInfo,
  ParentDetails,
  StudentDetails,
  TeacherDetails,
  UserRole,
} from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

//////////////////////////////////
// Constants
const MAX_STEPS = 4;

export const ONBOARDING_STEPS = {
  GENERAL: 1,
  ROLE: 2,
  DETAILS: 3,
  CONFIRMATION: 4,
} as const;
//////////////////////////////////

//////////////////////////////////
// Interfaces
interface LoadingStates {
  general: boolean;
  role: boolean;
  details: boolean;
  confirmation: boolean;
}

interface OnboardingState {
  currentStep: number;
  steps: {
    general: GeneralInfo | null;
    role: UserRole | null;
    details: StudentDetails | TeacherDetails | ParentDetails | null;
  };
  loadingStates: LoadingStates;
  isSubmitted: boolean;
  error: string | null;
}
//////////////////////////////////

//////////////////////////////////
// Initial State
export const initialState: OnboardingState = {
  currentStep: 1,
  steps: {
    general: null,
    role: null,
    details: null,
  },
  loadingStates: {
    general: false,
    role: false,
    details: false,
    confirmation: false,
  },
  isSubmitted: false,
  error: null,
};
//////////////////////////////////

//////////////////////////////////
// Validation Utilities
export const canProceedToNextStep = (state: OnboardingState): boolean => {
  switch (state.currentStep) {
    case ONBOARDING_STEPS.GENERAL:
      return !!state.steps.general;
    case ONBOARDING_STEPS.ROLE:
      return !!state.steps.role;
    case ONBOARDING_STEPS.DETAILS:
      return !!state.steps.details;
    default:
      return false;
  }
};
//////////////////////////////////

//////////////////////////////////
// API Error Handler
const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};
//////////////////////////////////

//////////////////////////////////
// Thunks
export const submitGeneralInfo = createAsyncThunk(
  "onboarding/submitGeneral",
  async (data: GeneralInfo, { rejectWithValue }) => {
    try {
      const response = await api.patch<ApiResponse<GeneralInfo>>(
        "/onboarding/general",
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const submitRoleSelection = createAsyncThunk(
  "onboarding/submitRoleSelection",
  async (data: UserRole, { rejectWithValue }) => {
    try {
      const response = await api.patch<ApiResponse<UserRole>>(
        "/onboarding/role",
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const submitStudentDetails = createAsyncThunk(
  "onboarding/submitStudentDetails",
  async (data: StudentDetails, { rejectWithValue }) => {
    try {
      const response = await api.patch<ApiResponse<StudentDetails>>(
        "/onboarding/student",
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const submitTeacherDetails = createAsyncThunk(
  "onboarding/submitTeacherDetails",
  async (data: TeacherDetails, { rejectWithValue }) => {
    try {
      const response = await api.patch<ApiResponse<TeacherDetails>>(
        "/onboarding/teacher",
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const submitParentDetails = createAsyncThunk(
  "onboarding/submitParentDetails",
  async (data: ParentDetails, { rejectWithValue }) => {
    try {
      const response = await api.patch<ApiResponse<ParentDetails>>(
        "/onboarding/parent",
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const submitConfirmation = createAsyncThunk(
  "onboarding/submitConfirmation",
  async (data: boolean, { rejectWithValue }) => {
    try {
      const response = await api.patch<ApiResponse<boolean>>(
        "/onboarding/confirmation",
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
//////////////////////////////////

//////////////////////////////////
// Helper for details submission
export const getDetailsSubmissionThunk = (role: UserRole) => {
  switch (role) {
    case "student":
      return submitStudentDetails;
    case "teacher":
      return submitTeacherDetails;
    case "parent":
      return submitParentDetails;
    default:
      throw new Error("Invalid role");
  }
};
//////////////////////////////////

//////////////////////////////////
/// Slice
export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < MAX_STEPS && canProceedToNextStep(state)) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.steps.role = action.payload;
    },
    resetOnboarding: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // General Info
      .addCase(submitGeneralInfo.pending, (state) => {
        state.loadingStates.general = true;
        state.error = null;
      })
      .addCase(submitGeneralInfo.fulfilled, (state, action) => {
        state.steps.general = action.payload;
        state.loadingStates.general = false;
        state.currentStep += 1;
        state.error = null;
      })
      .addCase(submitGeneralInfo.rejected, (state, action) => {
        state.loadingStates.general = false;
        state.error = action.payload as string;
      })
      // Role Selection
      .addCase(submitRoleSelection.pending, (state) => {
        state.loadingStates.role = true;
        state.error = null;
      })
      .addCase(submitRoleSelection.fulfilled, (state, action) => {
        state.steps.role = action.payload;
        state.loadingStates.role = false;
        state.currentStep += 1;
        state.error = null;
      })
      .addCase(submitRoleSelection.rejected, (state, action) => {
        state.loadingStates.role = false;
        state.error = action.payload as string;
      })
      // Student Details
      .addCase(submitStudentDetails.pending, (state) => {
        state.loadingStates.details = true;
        state.error = null;
      })
      .addCase(submitStudentDetails.fulfilled, (state, action) => {
        state.steps.details = action.payload;
        state.loadingStates.details = false;
        state.currentStep += 1;
        state.error = null;
      })
      .addCase(submitStudentDetails.rejected, (state, action) => {
        state.loadingStates.details = false;
        state.error = action.payload as string;
      })
      // Teacher Details
      .addCase(submitTeacherDetails.pending, (state) => {
        state.loadingStates.details = true;
        state.error = null;
      })
      .addCase(submitTeacherDetails.fulfilled, (state, action) => {
        state.steps.details = action.payload;
        state.loadingStates.details = false;
        state.currentStep += 1;
        state.error = null;
      })
      .addCase(submitTeacherDetails.rejected, (state, action) => {
        state.loadingStates.details = false;
        state.error = action.payload as string;
      })
      // Parent Details
      .addCase(submitParentDetails.pending, (state) => {
        state.loadingStates.details = true;
        state.error = null;
      })
      .addCase(submitParentDetails.fulfilled, (state, action) => {
        state.steps.details = action.payload;
        state.loadingStates.details = false;
        state.currentStep += 1;
        state.error = null;
      })
      .addCase(submitParentDetails.rejected, (state, action) => {
        state.loadingStates.details = false;
        state.error = action.payload as string;
      })
      // Confirmation
      .addCase(submitConfirmation.pending, (state) => {
        state.loadingStates.confirmation = true;
        state.error = null;
      })
      .addCase(submitConfirmation.fulfilled, (state) => {
        state.isSubmitted = true;
        state.loadingStates.confirmation = false;
        state.error = null;
      })
      .addCase(submitConfirmation.rejected, (state, action) => {
        state.loadingStates.confirmation = false;
        state.error = action.payload as string;
      });
  },
});
//////////////////////////////////

//////////////////////////////////
// Type Guards
export const isStudentDetails = (
  details: StudentDetails | TeacherDetails | ParentDetails | null,
): details is StudentDetails => {
  return details !== null && "grade" in details;
};

export const isTeacherDetails = (
  details: StudentDetails | TeacherDetails | ParentDetails | null,
): details is TeacherDetails => {
  return details !== null && "subject" in details;
};

export const isParentDetails = (
  details: StudentDetails | TeacherDetails | ParentDetails | null,
): details is ParentDetails => {
  return details !== null && "children" in details;
};
//////////////////////////////////

//////////////////////////////////
// Enhanced Selectors
export const selectCurrentStep = (state: RootState) =>
  state.onboarding.currentStep;
export const selectLoadingState =
  (step: keyof LoadingStates) => (state: RootState) =>
    state.onboarding.loadingStates[step];
export const selectError = (state: RootState) => state.onboarding.error;
export const selectIsComplete = (state: RootState) =>
  state.onboarding.isSubmitted;
export const selectGeneralInfo = (state: RootState) =>
  state.onboarding.steps.general;
export const selectRole = (state: RootState) => state.onboarding.steps.role;
export const selectDetails = (state: RootState) =>
  state.onboarding.steps.details;

export const selectIsStepComplete = (step: number) => (state: RootState) => {
  switch (step) {
    case ONBOARDING_STEPS.GENERAL:
      return !!state.onboarding.steps.general;
    case ONBOARDING_STEPS.ROLE:
      return !!state.onboarding.steps.role;
    case ONBOARDING_STEPS.DETAILS:
      return !!state.onboarding.steps.details;
    case ONBOARDING_STEPS.CONFIRMATION:
      return state.onboarding.isSubmitted;
    default:
      return false;
  }
};

export const selectCurrentStepData = (state: RootState) => {
  switch (state.onboarding.currentStep) {
    case 1:
      return state.onboarding.steps.general;
    case 2:
      return state.onboarding.steps.role;
    case 3:
      return state.onboarding.steps.details;
    default:
      return null;
  }
};

export const { nextStep, prevStep, setRole, resetOnboarding } =
  onboardingSlice.actions;
export default onboardingSlice.reducer;
