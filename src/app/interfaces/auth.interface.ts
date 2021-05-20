import { Request } from 'express';
import { User } from './users.interface';

export interface DataStoredInToken {
  _id: string;
  fullName: string;
  profilePicture: string;
  role: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
