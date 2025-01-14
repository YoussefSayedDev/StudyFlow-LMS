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
import { Locale } from "@/i18n.config";
import { Directions, Languages } from "@/types/enums";
import createValidationSchemas, {
  SignInValuesType,
} from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";

interface SignInFormProps {
  locale: Locale;
  translations: {
    [key: string]: string;
  };
}

export default function SignInForm({ locale, translations }: SignInFormProps) {
  const { SignInValues } = createValidationSchemas(locale);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValuesType>({
    resolver: zodResolver(SignInValues),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInValuesType) {
    setError(null); // Clear previous errors
    startTransition(() => {
      try {
        console.log(data); // Simulate API call
        // Handle success or server-side validation here
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      }
    });
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
              <FormLabel>{translations.usernameLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={translations.usernamePlaceholder}
                  type="text"
                  {...field}
                  className="h-12"
                  aria-label={translations.usernameLabel}
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
              <FormLabel>{translations.passwordLabel}</FormLabel>
              <FormControl>
                <PasswordInput
                  dir={
                    locale === Languages.Arabic
                      ? Directions.RTL
                      : Directions.LTR
                  }
                  placeholder={translations.passwordPlaceholder}
                  {...field}
                  className="h-12"
                  aria-label={translations.passwordLabel}
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
          {translations.submitButton}
          <MdLogout size={20} />
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
