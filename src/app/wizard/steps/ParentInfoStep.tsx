import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function ParentInfoStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="childName">Child&apos;s Name</Label>
        <Input id="childName" {...register("childName", { required: true })} />
      </div>
      <div>
        <Label htmlFor="childGrade">Child&apos;`s Grade</Label>
        <Input
          id="childGrade"
          {...register("childGrade", { required: true })}
        />
      </div>
    </div>
  );
}
