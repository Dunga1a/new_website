import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PayloadgenerateToken } from 'src/utils/types';
import { IUserService } from 'src/users/users';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: IUserService, configService: ConfigService);
    validate(payload: PayloadgenerateToken): Promise<import("../../../utils/typeorm").User>;
}
export {};
