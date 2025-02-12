import Announcements from "@/features/student/_components/Announcements";
import CourseList from "@/features/student/_components/CourseList";
import KanbanBoard from "@/features/student/_components/knaban/KanbanBoard";
import StudyTimeTracker from "@/features/student/_components/StudyTimeTracker";
import TodoList from "@/features/student/_components/TodoList";

export default function StudentStudyPage() {
  return (
    <main>
      <div className="container mx-auto p-2 pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <KanbanBoard />
            <Announcements />
          </div>
          <div className="space-y-6">
            <TodoList />
            <StudyTimeTracker />
            {/* <UpcomingAssignments /> */}
            <CourseList />
          </div>
        </div>
      </div>
    </main>
  );
}
