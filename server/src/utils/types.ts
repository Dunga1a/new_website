import { Request } from 'express';
import { User } from './typeorm';

enum RoleEnum {
  User = 'user',
  Admin = 'admin',
}
export default RoleEnum;

export type CreateUserDetails = {
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email: string;
  created_at?: Date;
  image?: string;
};

export type ValidateUserDetails = {
  username: string;
  password: string;
};

export type Useremail = {
  email: string;
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

export type CreateEventDetails = {
  date_start: Date;
  time: string;
  title: string;
  address: string;
  leader: string;
  content: string;
};

export type EditEventDetails = {
  id: number;
  date_start: Date;
  date_end?: Date;
  file_pdf?: string;
  status?: number;
  time: string;
  title: string;
  address: string;
  leader: string;
  content: string;
};

export type CreateOrganizationDetails = {
  name: string;
};

export type CreateMemberDetails = {
  name_company: string;
  role_name: string;
  representative: string;
  phone: string;
  email: string;
  code_company: string;
  address: string;
  intro: string;
  slug: string;
};

export type NewsCategoryDetails = {
  news_category_id?: number;
  father_id?: number;
  name: string;
  slug: string;
  isEdit?: boolean;
};

export type BusinessAreasDetails = {
  id_business_areas?: number;
  name: string;
  slug: string;
  intro: string;
  status?: number;
};

export type OrganizationDetails = {
  id_organize_membership?: number;
  name: string;
  status?: boolean;
  isEdit?: boolean;
};

export type EditRole = {
  id: number;
  name: string;
};
