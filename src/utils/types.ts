import { Request, Response } from 'express';
import { Image, User } from './typeorm';
enum RoleEnum {
  User = 'user',
  Admin = 'admin',
}
export default RoleEnum;

export enum Gender {
  NA = 1,
  Nam = 2,
  Nu = 3,
}

export enum StatusAccount {
  'Bình Thường' = 1,
  'Khóa' = 2,
}

export type CreateUserDetails = {
  lastname?: string;
  firstname: string;
  username: string;
  password: string;
  email: string;
  gender: Gender;
  birthday: Date;
  signature?: string;
  status: StatusAccount;
};

export type ValidateUserDetails = {
  username: string;
  password: string;
};

export type PayloadgenerateToken = {
  username: string;
};

export type TokenPayload = {
  userId: string;
};

export type editUser = {
  username: string;
  roleId: string;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}

export interface RequestWithUser extends Request {
  user: User;
}

export type getImage = {
  id: string;
  res: Response;
};

export type paramsUploadAvatar = {
  id: string;
  file: Express.Multer.File;
};

export type dataUploadProfile = {
  firstname: string;
  lastname: string;
  email: string;
  gender: Gender;
  birthday: Date;
  signature: string;
  // image: Image;
};
