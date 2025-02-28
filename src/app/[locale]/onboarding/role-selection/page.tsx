"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOnboardingStore } from "@/lib/useOnboardingStore";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { ProgressIndicator } from "../_components/ProgressIndicator";

export default function RoleSelectionPage() {
  // const [userRole, setUserRole] = useState("");
  // const [role, setRole]
  const router = useRouter();
  const { setRole, role, setStep, step } = useOnboardingStore();

  // const handleRoleChange = (value: string) => {

  // };

  return (
    <Card className="w-full space-y-4">
      <CardHeader>
        <CardTitle>Role Selection</CardTitle>
        <ProgressIndicator currentStep={2} totalSteps={4} />
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={role as string}
          onValueChange={(value: UserRole) => setRole(value)}
          className="flex items-center justify-center gap-4 space-x-2"
        >
          <div
            className={cn(
              "flex h-24 w-36 items-center justify-center space-x-2 rounded-md bg-secondary",
              role === "teacher" && "bg-primary",
            )}
          >
            <RadioGroupItem value="teacher" id="teacher" className="hidden" />
            <Label
              htmlFor="teacher"
              className={cn(
                "flex cursor-pointer select-none flex-col items-center gap-2 text-lg text-card-foreground",
                role === "teacher" && "text-primary-foreground",
              )}
            >
              <GiTeacher className="size-8" />
              I&apos;m a teacher
            </Label>
          </div>
          <div
            className={cn(
              "flex h-24 w-36 items-center justify-center space-x-2 rounded-md bg-secondary",
              role === "student" && "bg-primary",
            )}
          >
            <RadioGroupItem value="student" id="student" className="hidden" />
            <Label
              htmlFor="student"
              className={cn(
                "flex cursor-pointer select-none flex-col items-center gap-2 text-lg text-card-foreground",
                role === "student" && "text-primary-foreground",
              )}
            >
              <PiStudent className="size-8" />
              I&apos;m a student
            </Label>
          </div>
          <div
            className={cn(
              "flex h-24 w-36 items-center justify-center space-x-2 rounded-md bg-secondary",
              role === "parent" && "bg-primary",
            )}
          >
            <RadioGroupItem value="parent" id="parent" className="hidden" />
            <Label
              htmlFor="parent"
              className={cn(
                "flex cursor-pointer select-none flex-col items-center gap-2 text-lg text-card-foreground",
                role === "parent" && "text-primary-foreground",
              )}
            >
              <RiParentLine className="size-8" />
              I&apos;m a parent
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(step - 1)}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
