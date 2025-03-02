import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateOnboardingSchemas from "../useCreateOnboardingSchemas";

export default function useTeacherDetailsForm() {
  const { data, updateData } = useOnboardingStore();
  const { TeacherDetailsSchema } = useCreateOnboardingSchemas();

  type TeacherDetailsInputs = z.infer<typeof TeacherDetailsSchema>;

  const form = useForm<TeacherDetailsInputs>({
    resolver: zodResolver(TeacherDetailsSchema),
    defaultValues: {
      subjects: data.subjects || "",
      teacherId: data.teacherId || "",
      department: data.department || "",
    },
  });

  const onSubmit = (values: TeacherDetailsInputs, onNext: () => void) => {
    updateData(values);
    onNext();
  };

  return { form, onSubmit };
}
