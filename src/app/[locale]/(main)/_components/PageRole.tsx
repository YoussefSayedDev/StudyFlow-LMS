"use client";
import { useRole } from "@/hooks/useRole";
import AdminPage from "../roles/AdminPage";
import ParentPage from "../roles/ParentPage";
import StudentPage from "../roles/SudentPage";
import TeacherPage from "../roles/TeacherPage";

export default function Role() {
  const { role } = useRole();
  switch (role) {
    case "admin":
      return <AdminPage />;
    case "student":
      return <StudentPage />;
    case "teacher":
      return <TeacherPage />;
    case "parent":
      return <ParentPage />;
    default:
      return <StudentPage />;
  }
}
