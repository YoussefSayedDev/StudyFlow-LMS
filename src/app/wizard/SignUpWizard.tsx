"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { completeProfile } from "./actions";
import ConfirmationStep from "./steps/ConfirmationStep";
import GeneralInfoStep from "./steps/GeneralInfoStep";
import ParentInfoStep from "./steps/ParentInfoStep";
import RoleSelectionStep from "./steps/RoleSelectionStep";
import StudentInfoSteps from "./steps/StudentInfoSteps";
import TeacherInfoStep from "./steps/TeacherInfoStep";

type FormType = {
  firstName: string;
  lastName: string;
  role: "teacher" | "student" | "parent";
  // Add more form fields here
};

export default function SignUpWizard() {
  const [step, setStep] = useState(0);
  const methods = useForm<FormType>();
  const { handleSubmit, watch } = methods;
  const router = useRouter();

  const role = watch("role");

  const steps = [
    {
      title: "General Information",
      component: <GeneralInfoStep />,
    },
    {
      title: "Role Selection",
      component: <RoleSelectionStep />,
    },
    {
      title: "Role-specific Information",
      component:
        role === "teacher" ? (
          <TeacherInfoStep />
        ) : role === "student" ? (
          <StudentInfoSteps />
        ) : (
          <ParentInfoStep />
        ),
    },
    {
      title: "Confirmation",
      component: <ConfirmationStep />,
    },
  ];

  const onSubmit = async (data: FormType) => {
    const result = await completeProfile(data);
    if (result.success) {
      // Redirect to dashboard or show success message
      alert("Profile completed successfully!");
      // router.push("/dashboard");
    } else {
      alert("Error completing profile: " + result.error);
      // console.log(result.error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>{steps[step].title}</CardTitle>
          </CardHeader>
          <CardContent>{steps[step].component}</CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step + 1)}
              disabled={step === steps.length - 1}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
