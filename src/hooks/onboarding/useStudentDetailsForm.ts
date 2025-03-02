import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateOnboardingSchemas from "../useCreateOnboardingSchemas";

export default function useStudentDetailsForm() {
  const { data, updateData } = useOnboardingStore();
  const { StudentDetailsSchema } = useCreateOnboardingSchemas();

  type StudentDetailsInputs = z.infer<typeof StudentDetailsSchema>;

  const form = useForm<StudentDetailsInputs>({
    resolver: zodResolver(StudentDetailsSchema),
    defaultValues: {
      grade: data.grade || "",
      studentId: data.studentId || "",
      subjects: data.subjects || "",
    },
  });

  const onSubmit = (values: StudentDetailsInputs, onNext: () => void) => {
    updateData(values);
    onNext();
  };

  return { form, onSubmit };
}
