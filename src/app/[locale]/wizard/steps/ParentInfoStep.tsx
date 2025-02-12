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
import { WizardFormParentInfo } from "@/validation/wizardForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProgressIndicator } from "../../onboarding/_components/ProgressIndicator";

export default function ParentInfoStep() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { step, setStep, setParentInfo } = useRole();
  const formParentInfo = useForm<WizardFormParentInfo>({
    resolver: zodResolver(WizardFormParentInfo),
    defaultValues: {
      childGrade: "",
      childName: "",
    },
  });

  async function onSubmit(data: WizardFormParentInfo) {
    setError(null);
    startTransition(() => {
      try {
        // console.log(data);
        setParentInfo(data);
        setStep(step + 1);
      } catch (err) {}
    });
  }
  return (
    <FormProvider {...formParentInfo}>
      <form
        onSubmit={formParentInfo.handleSubmit(onSubmit)}
        className="w-full space-y-4"
        aria-live="polite"
      >
        <Card>
          <CardHeader>
            <CardTitle>Parent Role</CardTitle>
            <ProgressIndicator currentStep={step} totalSteps={4} />
          </CardHeader>
          <CardContent>
            {error && (
              <p className="text-center text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            {/* Child Name */}
            <FormField
              control={formParentInfo.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="childName">Child Name</FormLabel>
                  <FormControl>
                    <Input
                      id="childName"
                      {...field}
                      type="text"
                      aria-label="child name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Child Grade */}
            <FormField
              control={formParentInfo.control}
              name="childGrade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="childGrade">Child Grade</FormLabel>
                  <FormControl>
                    <Input
                      id="childGrade"
                      {...field}
                      type="text"
                      aria-label="child grade"
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

{
  /* <div className="space-y-4">
      <div>
        <Label htmlFor="childName">Child&apos;s Name</Label>
        <Input id="childName" />
      </div>
      <div>
        <Label htmlFor="childGrade">Child&apos;`s Grade</Label>
        <Input id="childGrade" />
      </div>
    </div> */
}
