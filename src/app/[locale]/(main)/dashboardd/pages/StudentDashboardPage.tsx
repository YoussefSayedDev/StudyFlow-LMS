import { BookOpenCheck } from "lucide-react";
import { StudentOverviewCard } from "../../_components/StudentOverviewCard";

export default function StudentDashboardPage() {
  return (
    <main className="flex flex-col gap-4 p-4 xl:flex-row">
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">Student Overview</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StudentOverviewCard
            title="Introduction to Computer Science"
            description="CS101"
            progress={75}
            type="course"
          />
          <StudentOverviewCard
            title="Final Project"
            description="Due in 5 days"
            dueDate="2023-05-15"
            type="assignment"
          />
          <StudentOverviewCard title="Midterm Exam" grade="A" type="grade" />
        </div>
      </div>
    </main>
  );
}
