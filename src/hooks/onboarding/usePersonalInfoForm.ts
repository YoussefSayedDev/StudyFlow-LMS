import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateOnboardingSchemas from "../useCreateOnboardingSchemas";

export default function usePersonalInfoForm() {
  const { data, updateData } = useOnboardingStore();
  const { PersonalInfoSchema } = useCreateOnboardingSchemas();

  type PersonalInfoInputs = z.infer<typeof PersonalInfoSchema>;

  const form = useForm<PersonalInfoInputs>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      phoneNumber: data.phoneNumber || "",
      birthOfDate: data.birthOfDate || "",
    },
  });

  const onSubmit = (values: PersonalInfoInputs, onNext: () => void) => {
    updateData(values);
    onNext();
  };

  return { form, onSubmit };
}
