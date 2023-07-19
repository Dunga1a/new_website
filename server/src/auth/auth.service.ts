import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { compareHash } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserService } from '../users/users';
import { Services } from '../utils/constants';
import { PayloadgenerateToken, ValidateUserDetails } from '../utils/types';
import { IAuthService } from './auth';
import { User } from 'src/utils/typeorm';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const { password, username } = userDetails;
    const user = await this.userService.findByUsername(username);

    if (!user) {
      //console.log('Tài khoản của bạn đã bị khóa');
      throw new HttpException(
        'Tài khoản của bạn không đúng',
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.status === 2) {
      //console.log('Tài khoản của bạn đã bị khóa');
      throw new HttpException(
        'Tài khoản của bạn đã bị khóa',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Mật khẩu của bạn không chính xác',
        HttpStatus.NOT_FOUND,
      );
    }

    return isPasswordValid ? user : null;
  }

  async generateToken(userId: PayloadgenerateToken): Promise<any> {
    // const user = await this.userService.findById();
    return this.jwtService.sign(userId);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
