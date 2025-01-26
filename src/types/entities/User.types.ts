import { StaticImageData } from "next/image";
import { Id } from "../global.types";

export type GeneralInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export interface User extends GeneralInfo {
  id: Id;
  username: string;
  email: string;
  image?: string | StaticImageData;
}
