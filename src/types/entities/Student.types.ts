import { StaticImageData } from "next/image";
import { Id } from "../global.types";
import { User } from "./User.types";

export type StudentInfo = {
  childName: string;
  childGrade: string;
};

// Students interface
export interface Student extends User, StudentInfo {
  teachers: Id[];
  parent: Id;
  address: string;
  grade: number;
  class: string;
}

export interface StudentDetails {
  studentId: Id;
  gradeLevel: string;
  schoolName: string;
  emergencyContact: string;
}
