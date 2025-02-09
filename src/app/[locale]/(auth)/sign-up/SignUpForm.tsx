"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispath } from "@/hooks/redux";
import { signUpUser } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { Directions, Languages } from "@/types";
import createValidationSchemas, {
  SignUpValues,
  SignUpValuesType,
} from "@/validation/authValidation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

export default function SignUpForm() {
  const locale = useLocale() as Languages;
  const router = useRouter();
  const dispatch = useAppDispath();
  const { loading, error: authError } = useSelector(
    (state: RootState) => state.auth,
  );

  const { SignUpValues } = createValidationSchemas(locale);
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const t = useTranslations("auth.signUp.form");

  const form = useForm<SignUpValuesType>({
    resolver: zodResolver(SignUpValues),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpValuesType) {
    setError(null); // Clear previous errors
    // startTransition(() => {
    try {
      const resultAction = await dispatch(signUpUser(data));

      if (signUpUser.fulfilled.match(resultAction)) {
        // Redirect to dashboard on successful login
        router.push("/student/home");
      } else if (signUpUser.rejected.match(resultAction)) {
        setError((resultAction.payload as string) || t("error"));
      }
    } catch (err) {
      setError(t("error"));
    }
    // });
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
        aria-live="polite"
      >
        {error && (
          <p className="text-center text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("username.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("username.placeholder")}
                  {...field}
                  className="h-12"
                  aria-label={t("username.label")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("email.placeholder")}
                  type="email"
                  {...field}
                  className="h-12"
                  aria-label={t("email.label")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password.label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  dir={
                    locale === Languages.Arabic
                      ? Directions.RTL
                      : Directions.LTR
                  }
                  placeholder={t("password.placeholder")}
                  {...field}
                  className="h-12"
                  aria-label={t("password.label")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <LoadingButton
          loading={isPending}
          type="submit"
          className="w-full select-none"
        >
          {t("submit")}
          <MdLogout size={20} />
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
