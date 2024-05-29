import { Subject } from "../models/subject";
import { User } from "../models/token";

export class Assignment {
  _id?: string;
  title!: string;
  creationDate!: Date;
  description!: string;
  dateDone?: Date;
  deadline!: Date;
  link!: string;
  subject!: string;
}
