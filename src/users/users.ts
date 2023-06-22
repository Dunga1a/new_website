import { Image, User } from '../utils/typeorm';
import {
  CreateUserDetails,
  dataUploadProfile,
  editUser,
  paramsUploadAvatar,
} from '../utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findByUsername(userName: string): Promise<User>;
  findById(id: string): Promise<User>;
  editUser(editUser: editUser): Promise<User>;
  updateProfile(
    id: string,
    dataUploadProfile: dataUploadProfile,
  ): Promise<User>;
  updateAvatar(paramsUploadAvatar: paramsUploadAvatar): Promise<User>;
}
