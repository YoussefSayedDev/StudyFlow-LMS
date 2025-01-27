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
import { Locale } from "@/i18n.config";
import { Directions, Languages } from "@/types";
import createValidationSchemas, {
  SignUpValues,
  SignUpValuesType,
} from "@/validation/authValidation";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";

interface SignUpFormProps {
  locale: Locale;
  translations: {
    [key: string]: string;
  };
}

export default function SignUpForm({ locale, translations }: SignUpFormProps) {
  const { SignUpValues } = createValidationSchemas(locale);
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      try {
        console.log(data); // Simulate API call
        // Handle success or server-side validation here
        setError("An unexpected error occurred. Please try again.");
      } catch (err) {}
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
                  {...field}
                  className="h-12"
                  aria-label={translations.usernameLabel}
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
              <FormLabel>{translations.emailLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={translations.emailPlaceholder}
                  type="email"
                  {...field}
                  className="h-12"
                  aria-label={translations.emailLabel}
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
