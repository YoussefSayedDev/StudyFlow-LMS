"use client";
import { useRole } from "@/hooks/useRole";
import AdminDashboardPage from "./AdminDashboardPage";
import ParentDashboardPage from "./ParentDashboardPage";
import StudentDashboardPage from "./StudentDashboardPage";
import TeacherDashboardPage from "./TeacherDashboardPage";

export default function Role() {
  const { role } = useRole();
  switch (role) {
    case "admin":
      return <AdminDashboardPage />;
    case "student":
      return <StudentDashboardPage />;
    case "teacher":
      return <TeacherDashboardPage />;
    case "parent":
      return <ParentDashboardPage />;
    default:
      return <StudentDashboardPage />;
  }
}
