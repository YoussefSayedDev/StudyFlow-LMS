import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, FileText, GraduationCap } from "lucide-react";
import React from "react";

interface StudentOverviewCardProps {
  title: string;
  description?: string;
  progress?: number;
  dueDate?: string;
  grade?: string;
  type: "course" | "assignment" | "grade";
}

export function StudentOverviewCard({
  title,
  description,
  progress,
  dueDate,
  grade,
  type,
}: StudentOverviewCardProps) {
  const Icon = getIcon(type);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          <Badge variant={getBadgeVariant(type)}>{type}</Badge>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {progress !== undefined && (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
        {dueDate && (
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Due Date</span>
            <span className="text-sm">{dueDate}</span>
          </div>
        )}
        {grade && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Grade</span>
            <span className="text-sm font-bold">{grade}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getBadgeVariant(
  type: "course" | "assignment" | "grade",
): "default" | "secondary" | "destructive" | "outline" {
  switch (type) {
    case "course":
      return "default";
    case "assignment":
      return "secondary";
    case "grade":
      return "outline";
    default:
      return "default";
  }
}

function getIcon(type: "course" | "assignment" | "grade") {
  switch (type) {
    case "course":
      return Book;
    case "assignment":
      return FileText;
    case "grade":
      return GraduationCap;
    default:
      return Book;
  }
}
