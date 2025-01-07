import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function StudentInfoStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="grade">Grade</Label>
        <Input id="grade" {...register("grade", { required: true })} />
      </div>
      <div>
        <Label htmlFor="school">School</Label>
        <Input id="school" {...register("school", { required: true })} />
      </div>
    </div>
  );
}
