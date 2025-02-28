import { useOnboardingStore } from "@/lib/useOnboardingStore";
import { useRouter } from "next/navigation";

export default function ParentDetailsPage() {
  const router = useRouter();
  const { setParentDetails } = useOnboardingStore();
  return <div>Parent Details Page</div>;
}
