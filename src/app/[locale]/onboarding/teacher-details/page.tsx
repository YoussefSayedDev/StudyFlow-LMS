"use client";

import { useOnboardingStore } from "@/lib/useOnboardingStore";
import { useRouter } from "next/navigation";

export default function TeacherDetailsPage() {
  const router = useRouter();
  const { setTeacherDetails } = useOnboardingStore();
  return <div>Teacher Details Page</div>;
}
