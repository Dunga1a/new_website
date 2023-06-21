import { User } from '../utils/typeorm';
import { CreateUserDetails, editUser } from '../utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findByUsername(userName: string): Promise<User>;
  findById(id: string): Promise<User>;
  editUser(editUser: editUser): Promise<User>;
}
