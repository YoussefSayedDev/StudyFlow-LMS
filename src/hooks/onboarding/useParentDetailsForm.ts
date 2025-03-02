import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateOnboardingSchemas from "../useCreateOnboardingSchemas";

export default function useParentDetailsForm() {
  const { data, updateData } = useOnboardingStore();
  const { ParentDetailsSchema } = useCreateOnboardingSchemas();

  type ParentDetailsInputs = z.infer<typeof ParentDetailsSchema>;

  const form = useForm<ParentDetailsInputs>({
    resolver: zodResolver(ParentDetailsSchema),
    defaultValues: {
      childrenCount: data.childrenCount || "",
      childrenIds: data.childrenIds || "",
    },
  });

  const onSubmit = (values: ParentDetailsInputs, onNext: () => void) => {
    updateData(values);
    onNext();
  };

  return { form, onSubmit };
}
