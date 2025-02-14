import api from "@/lib/api";
import {
  GeneralInfo,
  ParentDetails,
  StudentDetails,
  TeacherDetails,
} from "@/types";
import { configureStore } from "@reduxjs/toolkit";
import { initialState, onboardingSlice } from "../index";

// Mock Data
export const mockGeneralInfo: GeneralInfo = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  phoneNumber: "123456789",
};
export const mockStudentDetails: StudentDetails = {
  studentId: "123",
  gradeLevel: "Grade 1",
  schoolName: "School Name",
  emergencyContact: "Emergency Contact",
};
export const mockTeacherDetails: TeacherDetails = {
  teacherId: "456",
  subjectsTaught: ["Math", "Science"],
  qualificationLevel: "Grade 10",
  schoolAffiliation: "School Affiliation",
};
export const mockParentDetails: ParentDetails = {
  parentId: "789",
  occupation: "Occupation",
  employer: "Employer",
};

// Test Store Setup
export interface TestStore {
  getState: () => { onboarding: ReturnType<typeof onboardingSlice.reducer> };
  dispatch: jest.Mock;
}

export const createTestStore = (
  preloadedState?: Partial<ReturnType<typeof onboardingSlice.reducer>>,
): TestStore => {
  const store = configureStore({
    reducer: {
      onboarding: onboardingSlice.reducer,
    },
    preloadedState: preloadedState
      ? { onboarding: { ...initialState, ...preloadedState } }
      : undefined,
  });

  return {
    ...store,
    dispatch: jest.fn(store.dispatch),
  };
};

// API Response Helper
export const createApiResponse = <T>(data: T) => ({
  data,
  message: "Success",
  status: 200,
});

// Mock API
jest.mock("@/lib/api");
export const mockedApi = api as jest.Mocked<typeof api>;
