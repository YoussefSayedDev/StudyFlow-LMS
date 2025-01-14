import { useRole } from "@/hooks/useRole";
import { Role } from "@/types/enums";
import ConfirmationStep from "../steps/ConfirmationStep";
import GeneralInfoStep from "../steps/GeneralInfoStep";
import ParentInfoStep from "../steps/ParentInfoStep";
import RoleSelectionStep from "../steps/RoleSelectionStep";
import StudentInfoStep from "../steps/StudentInfoSteps";
import TeacherInfoStep from "../steps/TeacherInfoStep";

export default function WizardSteps() {
  const { step, role } = useRole();

  if (step === 0) return <GeneralInfoStep />;
  else if (step === 1) return <RoleSelectionStep />;
  else if (step === 2) {
    if (role === Role.Teacher) return <TeacherInfoStep />;
    else if (role === Role.Student) return <StudentInfoStep />;
    else return <ParentInfoStep />;
  } else if (step === 3) return <ConfirmationStep />;
  else return <div>Error</div>;
}
