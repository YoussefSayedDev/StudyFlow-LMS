import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function TeacherInfoStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" {...register("subject", { required: true })} />
      </div>
      <div>
        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
        <Input
          id="yearsOfExperience"
          type="number"
          {...register("yearsOfExperience", { required: true })}
        />
      </div>
    </div>
  );
}
