import Announcements from "@/features/student/_components/Announcements";
import AttendanceRecord from "@/features/student/_components/AttendanceRecord";
import CourseList from "@/features/student/_components/CourseList";
import DailySchedule from "@/features/student/_components/DailySchedule";
import GradeTrend from "@/features/student/_components/GradeTrend";
import StudyTimeTracker from "@/features/student/_components/StudyTimeTracker";
import TodoList from "@/features/student/_components/TodoList";

export default function StudentOverviewPage() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto p-2 pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DailySchedule />
            <GradeTrend />
            <Announcements />
          </div>
          <div className="space-y-6">
            <TodoList />
            <StudyTimeTracker />
            <AttendanceRecord />
            {/* <UpcomingAssignments /> */}
            <CourseList />
          </div>
        </div>
      </div>
    </main>
  );
}
