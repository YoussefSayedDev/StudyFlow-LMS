import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const WizardFormGeneralInfo = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
  })
  .refine((data) => isValidPhoneNumber(data.phoneNumber), {
    message: "Please enter a valid phone number for the selected country",
    path: ["phoneNumber"],
  });

export type WizardFormGeneralInfo = z.infer<typeof WizardFormGeneralInfo>;

export const WizardFormRoleSelection = z.object({
  role: z.enum(["teacher", "student", "parent"]),
});

export type WizardFormRoleSelection = z.infer<typeof WizardFormRoleSelection>;

export const WizardFormTeacherInfo = z.object({
  subject: z.string().min(1, "Subject is required"),
  yearsOfExperience: z.string().min(1, "Years of Experience is required"),
  grade: z.string().min(1, "Grade is required"),
  school: z.string().min(1, "School is required"),
});

export type WizardFormTeacherInfo = z.infer<typeof WizardFormTeacherInfo>;

export const WizardFormStudentInfo = z.object({
  childName: z.string().min(1, "Child Name is required"),
  childGrade: z.string().min(1, "Child Grade is required"),
});

export type WizardFormStudentInfo = z.infer<typeof WizardFormStudentInfo>;

export const WizardFormParentInfo = z.object({
  childName: z.string().min(1, "Child Name is required"),
  childGrade: z.string().min(1, "Child Grade is required"),
});

export type WizardFormParentInfo = z.infer<typeof WizardFormParentInfo>;

export const WizardFormConfirmation = z.object({
  confirm: z.literal(true),
});

export type WizardFormConfirmation = z.infer<typeof WizardFormConfirmation>;
