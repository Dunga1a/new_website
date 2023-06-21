import { IUserService } from '../users/users';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { RequestWithUser, ValidateUserDetails } from 'src/utils/types';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: IAuthService, userService: IUserService);
    registerUser(createUserDto: CreateUserDto): Promise<Record<string, any>>;
    login(request: RequestWithUser, user: ValidateUserDetails): Promise<{
        user: import("../utils/typeorm").User;
        token: any;
    }>;
    admin(user: any): Promise<any>;
}
