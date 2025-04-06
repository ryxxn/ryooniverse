import { IUser } from './user';

export interface IGuestbook {
  id: string;
  userId: Pick<IUser, 'id'>;
  message: string;
  isPrivate: boolean;
  createdAt: Date;
  user: Pick<IUser, 'id' | 'username' | 'character'>;
}
