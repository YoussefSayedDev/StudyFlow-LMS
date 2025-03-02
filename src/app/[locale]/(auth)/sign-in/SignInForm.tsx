"use client";

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
import { useSignInMutation } from "@/lib/auth/authApi";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { Directions, Languages } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";
import { z } from "zod";

export default function SignInForm() {
  const locale = useLocale() as Languages;
  const { SignInFormData } = useCreateAuthSchemas();
  type SignInFormDataType = z.infer<typeof SignInFormData>;
  const t = useTranslations("auth.signIn.form");
  const router = useRouter();

  // Get auth store state
  const { error, clearError, user, isAuthenticated } = useAuthStore();

  // Use React Query mutation
  const { mutate, isPending } = useSignInMutation();

  const form = useForm<SignInFormDataType>({
    resolver: zodResolver(SignInFormData),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: SignInFormDataType) {
    clearError();
    mutate(data);
  }

  // Handle redirection based on user role after successful authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(`/${user.role}/home`);
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
                  type="text"
                  {...field}
                  className="h-12"
                  aria-label={t("username.label")}
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
