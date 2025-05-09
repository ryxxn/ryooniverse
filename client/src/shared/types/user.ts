export interface IUser {
  id: string;
  ipAddress: string;
  username: string;
  createdAt: Date;
  character: string;
}

export interface ICharacter
  extends Pick<IUser, 'id' | 'character' | 'username'> {
  x: number;
  y: number;
  chat?: string | null;
  chatExpireId?: number | null;
}
