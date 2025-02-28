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
import useCreateValidationSchemas from "@/hooks/useCreateValidationSchemas";
import { useRouter } from "@/i18n/routing";
import { useSignUp } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";
import { Directions, Languages, SignUpFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";

export default function SignUpForm() {
  // State Variables
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
  });

  // Localization
  const locale = useLocale() as Languages;
  const t = useTranslations("auth.signUp.form");

  // Hooks
  const router = useRouter();
  // const { setUser } = useAuthStore();

  // React Query
  const { mutate, error, isPending } = useSignUp();
  // const { mutate, error, isPending } = useMutation({
  //   mutationFn: signUp,
  //   onSuccess: (data) => {
  //     setUser({ id: data.id, email: formData.email, token: data.accessToken });
  //     console.log({
  //       id: data.id,
  //       email: formData.email,
  //       token: data.accessToken,
  //     });
  //     router.push("/verify-email"); // Redirect to email verification page
  //   },
  // });

  // Form Setup
  const { SignUpFormData } = useCreateValidationSchemas();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormData),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Form Submission
  const onSubmit = async (data: SignUpFormData) => {
    mutate(data);
    if (!error) router.push("/verify-email");
    // setFormData(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
        aria-live="polite"
      >
        {error && (
          <p className="text-center text-sm text-red-500" role="alert">
            {error.message}
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
