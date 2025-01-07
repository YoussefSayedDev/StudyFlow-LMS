import { useFormContext } from "react-hook-form";

export default function ConfirmationStep() {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">
        Please confirm your information
      </h3>
      <ul className="list-disc pl-5">
        <li>
          Name: {formData.firstName} {formData.lastName}
        </li>
        <li>Role: {formData.role}</li>
        {formData.role === "teacher" && (
          <>
            <li>Subject: {formData.Subject}</li>
            <li>Years of Experience:{formData.yearsOfExperience}</li>
          </>
        )}
        {formData.role === "student" && (
          <>
            <li>Grade: {formData.grade}</li>
            <li>School: {formData.school}</li>
          </>
        )}
        {formData.role === "parent" && (
          <>
            <li>Child&apos;s Name: {formData.childName}</li>
            <li>Child&apos;s Grade: {formData.childGrade}</li>
          </>
        )}
      </ul>
    </div>
  );
}
