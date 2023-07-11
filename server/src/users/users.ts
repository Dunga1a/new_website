import { User } from '../utils/typeorm';
import { CreateUserDetails, Useremail, editUser } from '../utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findByUsername(userName: string): Promise<User>;
  findById(id: string): Promise<User>;
  editUser(editUser: editUser): Promise<User>;

  getUserPaginationAndStatus(status: boolean, page: number, pageSize: number);

  forgetPassword(email: Useremail);

  updateUserEmail(email: string, userId: string);
  changePassword(newPassword: string, id: string);

  editUserProfile(userDetails: any, idUser: string);

  updateAvatarUser(userId: string, avatarUrl: string);

  approveUsersClose(idUser: number[]);

  checkUserStatus(username: string);

  approveUsersOpen(idUser: number[]);

  createAdminUser(username: string, password: string);
  registerUser(createUser: any);

  updateImage(userId: string);
}
