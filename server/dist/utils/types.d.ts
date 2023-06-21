import { Request } from 'express';
import { User } from './typeorm';
declare enum RoleEnum {
    User = "user",
    Admin = "admin"
}
export default RoleEnum;
export declare type CreateUserDetails = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
};
export declare type ValidateUserDetails = {
    username: string;
    password: string;
};
export declare type PayloadgenerateToken = {
    username: string;
};
export declare type TokenPayload = {
    userId: string;
};
export declare type editUser = {
    username: string;
    roleId: string;
};
export interface AuthenticatedRequest extends Request {
    user: User;
}
export interface RequestWithUser extends Request {
    user: User;
}
export declare type Contact = {
    topic: string;
    title: string;
    email: string;
    address: string;
    content: string;
};
export declare type RelyDetails = {
    content: string;
};
