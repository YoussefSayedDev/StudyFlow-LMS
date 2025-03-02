export enum UserRole {
  STUDENT = "student",
  TEACHER = "teacher",
  PARENT = "parent",
  ADMIN = "admin",
}

export interface StudentDetails {
  gradeLevel: string;
  schoolName: string;
  preferredSubjects: string[];
  parentPhoneNumber: string;
}

export interface TeacherDetails {
  subject: string;
  yearsOfExperience: string;
  grade: string;
  school: string;
}

export interface ParentDetails {
  childName: string[];
  childGrade: string;
}
