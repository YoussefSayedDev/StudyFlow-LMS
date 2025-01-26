import { IconType } from "react-icons";
import { ParentInfo } from "./entities/Parent.types";
import { StudentInfo } from "./entities/Student.types";
import { TeacherInfo } from "./entities/Teacher.types";
import { GeneralInfo } from "./entities/User.types";

export type Id = number | string;

export interface FormData {
  generalInfo: GeneralInfo;
  parentInfo?: ParentInfo;
  studentInfo?: StudentInfo;
  teacherInfo?: TeacherInfo;
}

type MenuItem = {
  icon: IconType;
  label: string;
  href: string;
  visible: string[];
};

export interface Menu {
  title: string;
  items: MenuItem[];
}
