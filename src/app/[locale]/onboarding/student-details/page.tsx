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
import { useOnboardingStore } from "@/lib/useOnboardingStore";
import { WizardFormStudentInfo } from "@/validation/wizardForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { ProgressIndicator } from "../_components/ProgressIndicator";

export default function StudentDetailsPage() {
  const router = useRouter();
  const { setStudentDetails, step, setStep } = useOnboardingStore();

  const formStudentInfo = useForm<WizardFormStudentInfo>({
    resolver: zodResolver(WizardFormStudentInfo),
    defaultValues: {
      gradeLevel: "",
      schoolName: "",
      preferredSubjects: [],
      parentPhoneNumber: "",
    },
  });

  async function onSubmit(data: WizardFormStudentInfo) {
    setStep(step + 1);
    setStudentDetails(data);
    router.push("/onboarding/student-info");
    // setError(null);
    // startTransition(() => {
    //   try {
    //     // console.log(data);
    //     setStudentInfo(data);
    //     setStep(step + 1);
    //   } catch (err) {}
    // });
  }

  return (
    <FormProvider {...formStudentInfo}>
      <form
        onSubmit={formStudentInfo.handleSubmit(onSubmit)}
        className="w-full space-y-4"
        aria-live="polite"
      >
        <Card>
          <CardHeader>
            <CardTitle>Student Role</CardTitle>
            <ProgressIndicator currentStep={step} totalSteps={4} />
          </CardHeader>
          <CardContent>
            {/* {error && (
              <p className="text-center text-sm text-red-500" role="alert">
                {error}
              </p>
            )} */}
            {/* Grade Level */}
            <FormField
              control={formStudentInfo.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="gradeLevel">Grade Level</FormLabel>
                  <FormControl>
                    <Input
                      id="gradeLevel"
                      {...field}
                      type="text"
                      aria-label="grade level"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School Name */}
            <FormField
              control={formStudentInfo.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="schoolName">School Name</FormLabel>
                  <FormControl>
                    <Input
                      id="schoolName"
                      {...field}
                      type="text"
                      aria-label="school name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Preferred Subjects */}
            <FormField
              control={formStudentInfo.control}
              name="preferredSubjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="preferredSubjects">
                    Preferred Subjects
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="preferredSubjects"
                      {...field}
                      type="text"
                      aria-label="preferred subjects"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Parent Phone Number */}
            <FormField
              control={formStudentInfo.control}
              name="parentPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="parentPhoneNumber">
                    Parent Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="parentPhoneNumber"
                      {...field}
                      type="text"
                      aria-label="parent phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
            <Button type="submit" variant="outline" className="select-none">
              Next
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
