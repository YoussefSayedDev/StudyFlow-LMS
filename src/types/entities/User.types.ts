import { StaticImageData } from "next/image";
import { Role } from "../global.enums";
import { Id } from "../global.types";

export type UserRole = "teacher" | "student" | "parent";

export type GeneralInfo = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
};

// export interface User extends GeneralInfo {
//   id: Id;
//   username: string;
//   email: string;
//   image?: string | StaticImageData;
//   role: Role;
// }
