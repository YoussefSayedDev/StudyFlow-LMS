import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <Progress
        value={progress}
        className="h-2 w-full"
        aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <p className="text-center text-sm font-medium text-muted-foreground">
        Step {currentStep + 1} of {totalSteps}
      </p>
    </div>
  );
}
