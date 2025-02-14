import { StaticImageData } from "next/image";
import { Id } from "../global.types";
// import { User } from "./User.types";

// Teachers interface
export interface Admin {
  students: Id[];
  parents: Id[];
  teachers: Id[];
  address: string;
  subjects: string[];
  classes: string[];
}
