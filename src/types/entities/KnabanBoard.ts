import { Id } from "../global.types";

export type KnabanColumn = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};
