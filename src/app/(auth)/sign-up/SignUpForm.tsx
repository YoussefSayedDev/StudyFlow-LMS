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
import { SignUpValues } from "@/validation/authValidation";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpValues),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpValues) {
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="h-12"
                  aria-label="Username"
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  type="email"
                  {...field}
                  className="h-12"
                  aria-label="email"
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
          Sign Up
          <MdLogout size={20} />
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
