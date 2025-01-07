import { z } from "zod";

const requiredString = z.string().min(1, "Required");

export const SignUpValues = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_]+$/,
    "Only letters, numbers, - and _ are allowed",
  ),
  email: requiredString.email("Invalid email address"),
  password: requiredString
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export type SignUpValues = z.infer<typeof SignUpValues>;
