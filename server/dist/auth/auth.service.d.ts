import { IUserService } from '../users/users';
import { PayloadgenerateToken, ValidateUserDetails } from '../utils/types';
import { IAuthService } from './auth';
import { User } from 'src/utils/typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService implements IAuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: IUserService, jwtService: JwtService);
    validateUser(userDetails: ValidateUserDetails): Promise<User>;
    generateToken(userId: PayloadgenerateToken): Promise<any>;
    validateToken(token: string): Promise<any>;
}
