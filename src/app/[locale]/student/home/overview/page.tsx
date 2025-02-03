import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { useNavigation } from "@/hooks/useNavigation";
import { Role } from "@/types";
import Announcements from "../../_components/Announcements";
import AttendanceRecord from "../../_components/AttendanceRecord";
import CourseList from "../../_components/CourseList";
import DailySchedule from "../../_components/DailySchedule";
import GradeTrend from "../../_components/GradeTrend";
import StudyTimeTracker from "../../_components/StudyTimeTracker";
import TodoList from "../../_components/TodoList";

export default function StudentOverviewPage() {
  // const { currentSection, subPages, isActive } = useNavigation();

  return (
    // <AuthWrapper allowedRoles={[Role.Student]}>
    <main>
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
    // </AuthWrapper>
  );
}
