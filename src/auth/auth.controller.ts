import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { IUserService } from '../users/users';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import RoleEnum, {
  RequestWithUser,
  ValidateUserDetails,
} from 'src/utils/types';
import JwtAuthenticationGuard from './utils/jwt/jwt-authentication.guard';
import { LocalAuthGuard } from './utils/local/LocalGuards';
import { Roles } from './utils/role/roles.decorator';
import { RolesGuard } from './utils/role/roles.guard';
import { AuthUser } from 'src/utils/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request: RequestWithUser,
    @Body() user: ValidateUserDetails,
  ) {
    const payload = { username: user.username };
    const token = await this.authService.generateToken(payload);
    return { user: request.user, token };
  }

  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Get('admin')
  async admin(@AuthUser() user) {
    return user;
  }
}
