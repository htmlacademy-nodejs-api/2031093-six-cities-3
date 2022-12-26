import { User } from './user.type';

export type Comment = {
  comment: string;
  date: Date;
  rating: number;
  user: User;
}
