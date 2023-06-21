import { Request } from 'express';
import { User } from './typeorm';

enum RoleEnum {
  User = 'user',
  Admin = 'admin',
}
export default RoleEnum;

export type CreateUserDetails = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
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

export type Contact = {
  topic: string;
  title: string;
  email: string;
  address: string;
  content: string;
};

export type RelyDetails = {
  content: string;
};
