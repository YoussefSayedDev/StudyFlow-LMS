"use client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export default function useCreateValidationSchemas() {
  const t = useTranslations("auth.signUp.form.messages");

  const SignUpFormData = z.object({
    username: z
      .string()
      .min(1, t("username.required"))
      .regex(/^[a-zA-Z0-9_]+$/, t("username.invalid")),
    email: z.string().min(1, t("email.required")).email(t("email.invalid")),
    password: z
      .string()
      .min(1, t("password.required"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        t("password.complexity"),
      ),
  });

  const SignInFormData = z.object({
    username: z
      .string()
      .min(1, t("username.required"))
      .regex(/^[a-zA-Z0-9_]+$/, t("username.invalid")),
    password: z.string().min(1, t("password.required")),
  });

  type SignUpFormData = z.infer<typeof SignUpFormData>;
  type SignInFormData = z.infer<typeof SignInFormData>;

  return {
    SignUpFormData,
    SignInFormData,
  };
}
