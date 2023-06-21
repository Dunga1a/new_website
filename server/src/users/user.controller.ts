import { Controller, Get, Inject, Param, Put, Body } from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { IUserService } from './users';
import { User } from 'src/utils/typeorm';
import { editUser } from 'src/utils/types';

@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @Get(':username')
  async getUserByName(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Put('edit')
  async editUser(@Body() editUser: editUser): Promise<User> {
    return this.userService.editUser(editUser);
  }
}
