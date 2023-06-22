import {
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Routes, Services } from '../utils/constants';
import { IUserService } from './users';
import { User } from 'src/utils/typeorm';
import { dataUploadProfile, editUser } from 'src/utils/types';
import { AuthUser } from 'src/utils/decorators';
import JwtAuthenticationGuard from 'src/auth/utils/jwt/jwt-authentication.guard';
import { IImageService } from 'src/image/image';

@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    @Inject(Services.IMAGE) private readonly imageService: IImageService,
  ) {}

  @Get(':username')
  async getUserByName(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Put('edit')
  async editUser(@Body() editUser: editUser): Promise<User> {
    return this.userService.editUser(editUser);
  }

  @Put('/uploadprofile')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthenticationGuard)
  async updateProfile(
    @Body() dataUploadProfile: dataUploadProfile,
    @AuthUser() user,
  ): Promise<User> {
    const id = user.id;
    return this.userService.updateProfile(id, dataUploadProfile);
  }

  @Put('/uploadavatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthenticationGuard)
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() user,
  ): Promise<User> {
    const id = user.id;
    const params = { id, file };
    return this.userService.updateAvatar(params);
  }
}
