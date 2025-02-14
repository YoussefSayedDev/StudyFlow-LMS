"use client";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useRole } from "@/hooks/useRole";
import { WizardFormGeneralInfo } from "@/validation/wizardForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PhoneInput from "../_components/PhoneInput";
import { ProgressIndicator } from "../_components/ProgressIndicator";

export default function GeneralPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  // const { step, setStep, setGeneralInfo } = useRole();

  const formGeneralInfo = useForm<WizardFormGeneralInfo>({
    resolver: zodResolver(WizardFormGeneralInfo),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(data: WizardFormGeneralInfo) {
    setError(null);
    startTransition(() => {
      try {
        // action to send backend
      } catch (err) {}
    });
  }

  return (
    <FormProvider {...formGeneralInfo}>
      <form
        onSubmit={formGeneralInfo.handleSubmit(onSubmit)}
        className="w-full space-y-4"
        aria-live="polite"
      >
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <ProgressIndicator currentStep={0} totalSteps={4} />
          </CardHeader>
          <CardContent>
            {error && (
              <p className="text-center text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            {/* First Name */}
            <FormField
              control={formGeneralInfo.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      {...field}
                      type="text"
                      aria-label="first name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={formGeneralInfo.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      type="text"
                      aria-label="last name"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth  */}
            <FormField
              control={formGeneralInfo.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      id="dateOfBirth"
                      {...field}
                      type="date"
                      aria-label="date of birth"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={formGeneralInfo.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Phone Number"
                      field={field}
                      id="phoneNumber"
                      aria-label="Phone Number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" disabled={true}>
              Previous
            </Button>
            <LoadingButton
              loading={isPending}
              type="submit"
              variant="outline"
              className="select-none"
            >
              Next
            </LoadingButton>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
