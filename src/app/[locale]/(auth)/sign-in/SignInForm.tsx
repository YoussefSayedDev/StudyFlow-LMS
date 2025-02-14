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
import { RootState } from "@/redux/store/store";
import { Directions, Languages } from "@/types";
import createValidationSchemas, {
  SignInValuesType,
} from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
// import { getLocale } from "next-intl/server";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function SignInForm() {
  const locale = useLocale() as Languages;
  const router = useRouter();
  const dispatch = useAppDispath();
  const { error: authError } = useSelector((state: RootState) => state.auth);

  const { SignInValues } = createValidationSchemas(locale);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("auth.signIn.form");

  const form = useForm<SignInValuesType>({
    resolver: zodResolver(SignInValues),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInValuesType) {
    setError(null);
    try {
      // const resultAction = await dispatch(signInUser(data));

      // if (signInUser.fulfilled.match(resultAction)) {
      // Redirect to dashboard on successful login
      router.push("/en/student/home");
      // } else if (signInUser.rejected.match(resultAction)) {
      // setError((resultAction.payload as string) || t("error"));
      // }
    } catch (err) {
      setError(t("error"));
    }
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
