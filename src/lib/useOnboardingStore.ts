"use client";

import { create } from "zustand";

type UserRole = "student" | "teacher" | "parent" | null;

export type StudentDetails = {
  gradeLevel: string;
  schoolName: string;
  preferredSubjects: string[];
  parentPhoneNumber: string;
};

type TeacherDetails = {
  subject: string;
  yearsOfExperience: string;
  grade: string;
  school: string;
};

type ParentDetails = {
  childName: string[];
  childGrade: string;
};

interface OnboardingState {
  step: number; // Track current step
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  role: UserRole;
  studentDetails?: StudentDetails;
  teacherDetails?: { subject: string };
  parentDetails?: { childName: string[] };

  setStep: (step: number) => void;
  setGeneralInfo: (info: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }) => void;
  setRole: (role: UserRole) => void;
  setStudentDetails: (details: StudentDetails) => void;
  setTeacherDetails: (details: { subject: string }) => void;
  setParentDetails: (details: { childName: string[] }) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 1,
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phoneNumber: "",
  role: null,

  setStep: (step) => set({ step }),
  setGeneralInfo: (info) => set(info),
  setRole: (role) => set({ role }),
  setStudentDetails: (details) => set({ studentDetails: details }),
  setTeacherDetails: (details) => set({ teacherDetails: details }),
  setParentDetails: (details) => set({ parentDetails: details }),
  resetOnboarding: () =>
    set({ step: 1, firstName: "", lastName: "", phoneNumber: "", role: null }),
}));
