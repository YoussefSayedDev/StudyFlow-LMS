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
import { useAppDispath } from "@/hooks/redux";
import { useSignIn } from "@/lib/auth";
// import { RootState } from "@/redux/store/store";
import { useAuthStore } from "@/lib/store/authStore";
import { Directions, Languages } from "@/types";
import createValidationSchemas, {
  SignInValuesType,
} from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";

export default function SignInForm() {
  // State Variables

  // Localization
  const locale = useLocale() as Languages;

  // Hooks
  const router = useRouter();

  const { SignInValues } = createValidationSchemas(locale);
  // const [error, setError] = useState<string | null>(null);
  // const [isPending, startTransition] = useTransition();

  const t = useTranslations("auth.signIn.form");

  const { mutate, error, isPending } = useSignIn();
  // const { mutate, error, isPending } = useMutation({
  //   mutationFn: signIn,
  //   onSuccess: (data) => {
  //     console.log("data", data);
  //     router.push("/en/student/home");
  //   },
  // });

  const form = useForm<SignInValuesType>({
    resolver: zodResolver(SignInValues),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const user = useAuthStore((state) => state.user);

  async function onSubmit(data: SignInValuesType) {
    mutate(data);

    if (error) {
      console.log("error", error);
    }

    console.log(`User SignIn: ${user}`);
    if (!error) router.push("/en/student/home");
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
