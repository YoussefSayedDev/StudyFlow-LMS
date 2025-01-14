import { Locale } from "@/i18n.config";
import { Languages } from "@/types/enums";
import { z } from "zod";

// Translation dictionary for error messages
const validationMessages = {
  en: {
    required: "Required",
    username: "Only letters, numbers, - and _ are allowed",
    email: "Invalid email address",
    passwordMin: "Password must be at least 8 characters",
    passwordComplexity:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
  ar: {
    required: "هذا الحقل مطلوب",
    username: "يسمح فقط بالأحرف والأرقام و - و _",
    email: "عنوان البريد الإلكتروني غير صالح",
    passwordMin: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
    passwordComplexity:
      "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد، ورقم واحد، ورمز خاص واحد",
  },
};

// Utility function to create localized validation schemas
function createValidationSchemas(locale: Locale) {
  const messages = validationMessages[locale];

  const requiredString = z.string().min(1, messages.required);

  const SignUpValues = z.object({
    username: requiredString.regex(/^[a-zA-Z0-9_]+$/, messages.username),
    email: requiredString.email(messages.email),
    password: requiredString
      .min(8, messages.passwordMin)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        messages.passwordComplexity,
      ),
  });

  const SignInValues = z.object({
    username: requiredString.regex(/^[a-zA-Z0-9_]+$/, messages.username),
    password: requiredString,
  });

  return { SignUpValues, SignInValues };
}

export default createValidationSchemas;

// Get Types for validation schemas
export const { SignUpValues, SignInValues } = createValidationSchemas(
  Languages.English,
);
export type SignUpValuesType = z.infer<typeof SignUpValues>;
export type SignInValuesType = z.infer<typeof SignInValues>;
