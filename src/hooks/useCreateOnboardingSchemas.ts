"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export default function useCreateOnboardingSchemas() {
  const t = useTranslations("onboarding.form.messages");

  // Personal Info Step Schema
  const PersonalInfoSchema = z.object({
    firstName: z.string().min(2, t("firstName.required")),
    lastName: z.string().min(2, t("lastName.required")),
    phoneNumber: z.string().min(10, t("phoneNumber.required")),
    birthOfDate: z.string().refine((date) => new Date(date) < new Date(), {
      message: t("birthOfDate.past"),
    }),
  });

  // Role Selection Step Schema
  const RoleSelectionSchema = z.object({
    role: z.enum(["student", "teacher", "parent"], {
      required_error: t("role.required"),
    }),
  });

  // Student Details Step Schema
  const StudentDetailsSchema = z.object({
    grade: z.string().min(1, t("grade.required")),
    studentId: z.string().min(1, t("studentId.required")),
    subjects: z.string().min(1, t("subjects.required")),
  });

  // Teacher Details Step Schema
  const TeacherDetailsSchema = z.object({
    department: z.string().min(1, t("department.required")),
    teacherId: z.string().min(1, t("teacherId.required")),
    subjects: z.string().min(1, t("subjects.required")),
  });

  // Parent Details Step Schema
  const ParentDetailsSchema = z.object({
    childrenCount: z.string().min(1, t("childrenCount.required")),
    childrenIds: z.string().min(1, t("childrenIds.required")),
  });

  // Define types for each schema
  type PersonalInfoInputs = z.infer<typeof PersonalInfoSchema>;
  type RoleSelectionInputs = z.infer<typeof RoleSelectionSchema>;
  type StudentDetailsInputs = z.infer<typeof StudentDetailsSchema>;
  type TeacherDetailsInputs = z.infer<typeof TeacherDetailsSchema>;
  type ParentDetailsInputs = z.infer<typeof ParentDetailsSchema>;

  return {
    PersonalInfoSchema,
    RoleSelectionSchema,
    StudentDetailsSchema,
    TeacherDetailsSchema,
    ParentDetailsSchema,
  };
}
