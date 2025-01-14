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
import { SignInValues } from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInValues),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInValues) {
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  type="text"
                  {...field}
                  className="h-12"
                  aria-label="Username"
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                  className="h-12"
                  aria-label="Password"
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
          Sign In
          <MdLogout size={20} />
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
