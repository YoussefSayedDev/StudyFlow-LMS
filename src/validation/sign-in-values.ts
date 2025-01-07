import { z } from "zod";

const requiredString = z.string().min(1, "Required");

export const SignInValues = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_]+$/,
    "Only letters, numbers, - and _ are allowed",
  ),
  password: requiredString,
});

export type SignInValues = z.infer<typeof SignInValues>;
