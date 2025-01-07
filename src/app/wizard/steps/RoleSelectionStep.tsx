import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";

export default function RoleSelectionStep() {
  const { register } = useFormContext();

  return (
    <RadioGroup defaultValue="teacher">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="teacher" id="teacher" {...register("role")} />
        <Label htmlFor="teacher">Teacher</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="student" id="student" {...register("role")} />
        <Label htmlFor="student">Student</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="parent" id="parent" {...register("role")} />
        <Label htmlFor="parent">Parent</Label>
      </div>
    </RadioGroup>
  );
}
