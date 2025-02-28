"use client";
import { useRouter } from "@/i18n/routing";
import { useOnboardingStore } from "@/lib/useOnboardingStore";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";

async function submitOnboarding(data: any) {
  const res = await fetch("/onboarding/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export default function CompleteOnboardingPage() {
  const router = useRouter();
  const {
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    role,
    studentDetails,
    teacherDetails,
    parentDetails,
    setStep,
  } = useOnboardingStore();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitOnboarding,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const handleSubmit = () => {
    mutate({
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      role,
      studentDetails,
      teacherDetails,
      parentDetails,
    });
  };
  const handlePrev = () => {
    setStep(3); // Go back to the previous step (role-specific details)
    router.push(`/onboarding/${role}-details`);
  };
  return <div>Review Page</div>;
}
