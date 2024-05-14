import { User } from './token';

export interface Subject {
  _id?: string;
  name: string;
  teacher: User;
  photo?: string;
}
