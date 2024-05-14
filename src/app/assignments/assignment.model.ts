import { Subject } from "../models/subject";
import { User } from "../models/token";

export class Assignment {
  _id?: string;
  title!: string;
  creationDate!: Date;
  description!: string;
  dateDone?: Date;
  isDone!: boolean;
  isMark!: boolean;
  deadline!: Date;
  mark?: number;
  remark?: string;
  link?: string;
  author!: User;
  subject!: Subject;
}
