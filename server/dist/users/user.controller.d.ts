import { IUserService } from './users';
import { User } from 'src/utils/typeorm';
import { editUser } from 'src/utils/types';
export declare class UsersController {
    private readonly userService;
    constructor(userService: IUserService);
    getUserByName(username: string): Promise<User>;
    editUser(editUser: editUser): Promise<User>;
}
