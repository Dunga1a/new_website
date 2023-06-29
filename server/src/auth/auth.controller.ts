import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
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

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

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

    const loggedInUser = request.user;

    // Kiểm tra trạng thái của tài khoản
    const isActive = await this.userService.checkUserStatus(
      loggedInUser.username,
    );
    if (!isActive) {
      // Nếu tài khoản không hoạt động, trả về thông báo hoặc ném một ngoại lệ UnauthorizedException
      return { message: 'Tài khoản của bạn đã bị vô hiệu hóa.' };
    }
    return { user: request.user, token };
  }

  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Get('admin')
  async admin(@AuthUser() user) {
    return user;
  }
}
