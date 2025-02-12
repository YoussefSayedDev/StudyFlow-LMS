import { StaticImageData } from "next/image";
import { Id } from "../global.types";
import { User } from "./User.types";

export type TeacherInfo = {
  subject: string;
  yearsOfExperience: number;
};

// Teachers interface
export interface Teacher extends User, TeacherInfo {
  parents: Id[];
  students: Id[];
  address: string;
  subjects: string[];
  classes: string[];
}

export interface TeacherDetails {
  teacherId: Id;
  subjectsTaught: string[];
  qualificationLevel: string;
  schoolAffiliation: string;
}
