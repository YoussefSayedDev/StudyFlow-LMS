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
import { useRole } from "@/hooks/useRole";
import { WizardFormTeacherInfo } from "@/validation/wizardForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProgressIndicator } from "../../onboarding/_components/ProgressIndicator";

export default function TeacherInfoStep() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { step, setStep } = useRole();
  const formTeacherInfo = useForm<WizardFormTeacherInfo>({
    resolver: zodResolver(WizardFormTeacherInfo),
    defaultValues: {
      subject: "",
      yearsOfExperience: "",
    },
  });

  async function onSubmit(data: WizardFormTeacherInfo) {
    setError(null);
    startTransition(() => {
      try {
        // console.log(data);
        setStep(step + 1);
      } catch (err) {}
    });
  }
  return (
    <FormProvider {...formTeacherInfo}>
      <form
        onSubmit={formTeacherInfo.handleSubmit(onSubmit)}
        className="w-full space-y-4"
        aria-live="polite"
      >
        <Card>
          <CardHeader>
            <CardTitle>Teacher Role</CardTitle>
            <ProgressIndicator currentStep={step} totalSteps={4} />
          </CardHeader>
          <CardContent>
            {error && (
              <p className="text-center text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            {/* Subject */}
            <FormField
              control={formTeacherInfo.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="subject">Subject</FormLabel>
                  <FormControl>
                    <Input
                      id="subject"
                      {...field}
                      type="text"
                      aria-label="subject"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Years of Experience */}
            <FormField
              control={formTeacherInfo.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="yearsOfExperience">
                    Years of Experience
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="yearsOfExperience"
                      {...field}
                      type="number"
                      aria-label="years of experience"
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
