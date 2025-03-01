import { getTranslations } from "next-intl/server";
import { z } from "zod";

export default async function getOnboardingSchemas() {
  const t = await getTranslations("onboarding.form.messages");

  // Personal Info Step Schmea
  const PersonalInfoSchema = z.object({
    firstName: z
      .string()
      .min(
        2,
        t("firstName.required") || "First name must be at least 2 characters",
      ),
    lastName: z
      .string()
      .min(
        2,
        t("lastName.required") || "Last name must be at least 2 characters",
      ),
    phoneNumber: z
      .string()
      .min(10, t("phoneNumber.required") || "Phone number must be valid"),
    birthOfDate: z.string().refine((date) => new Date(date) < new Date(), {
      message: t("birthOfDate.past") || "Birth date must be in the past",
    }),
  });

  // Role Selection Step Schema
  const RoleSelectionSchema = z.object({
    role: z.enum(["student", "teacher", "parent"], {
      required_error: t("role.required") || "You need to select a role",
    }),
  });

  // Student Details Step Schema
  const StudentDetailsSchema = z.object({
    grade: z.string().min(1, t("grade.required") || "Grade is required"),
    studentId: z
      .string()
      .min(1, t("studentId.required") || "Student ID is required"),
    subjects: z
      .string()
      .min(1, t("subjects.required") || "At least one subject is required"),
  });

  // Teacher Details Step Schema
  const TeacherDetailsSchema = z.object({
    department: z
      .string()
      .min(1, t("department.required") || "Department is required"),
    teacherId: z
      .string()
      .min(1, t("teacherId.required") || "Teacher ID is required"),
    subjects: z
      .string()
      .min(1, t("subjects.required") || "At least one subject is required"),
  });

  // Parent Details Step Schema
  const ParentDetailsSchema = z.object({
    childrenCount: z
      .string()
      .min(1, t("childrenCount.required") || "Number of children is required"),
    childrenIds: z
      .string()
      .min(1, t("childrenIds.required") || "Children IDs are required"),
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
