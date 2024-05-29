import { Assignment } from "./assignment.model";
import { Subject } from "./subject";
import { User } from "./token";

export interface Note {
  averageMark: number;
  assingments: Assignment[];
  subject: Subject;
  student?: User
}
