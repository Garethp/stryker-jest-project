import { ToDoUser } from "./ToDoUser";
import { ToDoDescription } from "./ToDoDescription";

export type ToDo = {
  id?: string;
  name: string;
  priority: number;
  requests: number;
  users: ToDoUser[];
  descriptions: ToDoDescription[];
};
