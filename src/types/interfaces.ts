import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

interface MenuItem {
  icon: IconType;
  label: string;
  href: string;
  visible: string[];
}

export interface Menu {
  title: string;
  items: MenuItem[];
}

// Teachers interface
export interface Teacher {
  id: number;
  teacher_id: string;
  name: string;
  email?: string;
  phone: string;
  img: string | StaticImageData;
  address: string;
  subjects: string[];
  classes: string[];
}

// Students interface
export interface Student {
  id: number;
  student_id: string;
  name: string;
  email?: string;
  phone: string;
  img: string | StaticImageData;
  address: string;
  grade: number;
  class: string;
}

// Parents interface
export interface Parent {
  id: number;
  name: string;
  students: string[];
  email?: string;
  phone: string;
  address: string;
}

// GeneralInfo interface
export interface GeneralInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// ParentInfo interface
export interface ParentInfo {
  childName: string;
  childGrade: string;
}

// StudentInfo interface
export interface StudentInfo {
  childName: string;
  childGrade: string;
}

// TeacherInfo interface
export interface TeacherInfo {
  subject: string;
  yearsOfExperience: number;
}

// FormData interface
export interface FormData {
  generalInfo: GeneralInfo;
  parentInfo?: ParentInfo;
  studentInfo?: StudentInfo;
  teacherInfo?: TeacherInfo;
}
