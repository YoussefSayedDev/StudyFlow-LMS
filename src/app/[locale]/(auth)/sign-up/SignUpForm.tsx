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
import useCreateAuthSchemas from "@/hooks/useCreateAuthSchemas";
import { useRouter } from "@/i18n/routing";
import { useSignUpMutation } from "@/lib/auth/authApi";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Directions, Languages } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";
import { z } from "zod";

export default function SignUpForm() {
  const locale = useLocale() as Languages;
  const { SignUpFormData } = useCreateAuthSchemas();
  type SignUpFormDataType = z.infer<typeof SignUpFormData>;
  const t = useTranslations("auth.signUp.form");
  const router = useRouter();

  // Get auth store state
  const { error, clearError, user, isAuthenticated } = useAuthStore();

  // use React Query mutation
  const { mutate, isPending } = useSignUpMutation();

  const form = useForm<SignUpFormDataType>({
    resolver: zodResolver(SignUpFormData),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: SignUpFormDataType) {
    clearError();
    mutate(data);
  }

  // After successful signup, redirect to the email verification
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/verify-email");
    }
  }, [isAuthenticated, user, router]);

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
