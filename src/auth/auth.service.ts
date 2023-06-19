import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../users/users';
import { Services } from '../utils/constants';
import { PayloadgenerateToken, ValidateUserDetails } from '../utils/types';
import { IAuthService } from './auth';
import { User } from 'src/utils/typeorm';
import { compareHash } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const { password, username } = userDetails;
    const user = await this.userService.findByUsername(username);
    const isPasswordValid = await compareHash(password, user.password);
    console.log('2323', isPasswordValid);

    return isPasswordValid ? user : null;
  }

  async generateToken(userId: PayloadgenerateToken): Promise<any> {
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
