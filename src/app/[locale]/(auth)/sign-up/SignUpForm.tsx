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
import { useSignupMutation } from "@/redux/features/apiSlice";
import { selectError, selectLoadingState, signUp } from "@/redux/features/auth";
import { Directions, Languages, SignUpFormData } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

export default function SignUpForm() {
  // RTK Query
  // const [signup, { isLoading, isSuccess, isError, data: signupData, error }] =
  //   useSignupMutation();

  // Localization
  const locale = useLocale() as Languages;
  const t = useTranslations("auth.signUp.form");

  // Selectors && Hooks
  const isLoading = useSelector(selectLoadingState("signUp"));
  const error = useSelector(selectError);
  const router = useRouter();
  const dispatch = useAppDispath();

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
    try {
      const resultAction = await dispatch(
        signUp({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      ).unwrap();

      // const response = await signup(data).unwrap();

      // console.log("response", response);

      // Store token in localStorage or secure storage
      // localStorage.setItem("StudyFlowToken", resultAction.acc);

      // If successful, redirect to email verification page
      router.push("/verify-email");
    } catch (error) {
      // Error is handled by the reducer and shown vaia the error selector
      console.error("Sign up failed", error);
    }
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
          loading={isLoading}
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
