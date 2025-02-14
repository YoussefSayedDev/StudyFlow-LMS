import { Id } from "../global.types";
// import { User } from "./User.types";

export type ParentInfo = {
  childName: string;
  childGrade: string;
};

// Parents interface
export interface Parent extends ParentInfo {
  children: Id[];
  teachers: Id[];
  address: string;
}

export interface ParentDetails {
  parentId: Id;
  occupation: string;
  employer: string;
}
