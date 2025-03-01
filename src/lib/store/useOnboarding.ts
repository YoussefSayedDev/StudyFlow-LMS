import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthOfDate: string;
  role: string;
  grade: string;
  studentId: string;
  subjects: string;
  department: string;
  teacherId: string;
  childrenCount: string;
  childrenIds: string;
}

interface OnboardingStore {
  step: number;
  data: OnboardingData;
  setStep: (step: number) => void;
  updateData: (partialData: Partial<OnboardingData>) => void;
  resetData: () => void;
}

const initialData: OnboardingData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  birthOfDate: "",
  role: "",
  grade: "",
  studentId: "",
  subjects: "",
  department: "",
  teacherId: "",
  childrenCount: "",
  childrenIds: "",
};

export const useOnboarding = create<OnboardingStore>()(
  persist(
    (set) => ({
      step: 0,
      data: initialData,
      setStep: (step) => set({ step }),
      updateData: (partialData) =>
        set((state) => ({
          data: { ...state.data, ...partialData },
        })),
      resetData: () => set({ data: initialData, step: 0 }),
    }),
    {
      name: "onboarding-storage",
    },
  ),
);
