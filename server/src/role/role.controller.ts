/*
https://docs.nestjs.com/controllers#controllers
*/
import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IRoleService } from './role';
import { CreateRoleDto, EditRoleDto } from './dtos/CreateRole.dto';
import { Roles } from 'src/auth/utils/role/roles.decorator';
import RoleEnum from 'src/utils/types';
import JwtAuthenticationGuard from 'src/auth/utils/jwt/jwt-authentication.guard';
import { RolesGuard } from 'src/auth/utils/role/roles.guard';

@Controller(Routes.ROLE)
export class RoleController {
  constructor(
    @Inject(Services.ROLE) private readonly roleService: IRoleService,
  ) {}

  @Post('createRole')
  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  async createRole(@Body() role: CreateRoleDto) {
    const savedRole = await this.roleService.createRole(role);
    return savedRole;
  }

  @Get('getAll')
  async getAllRole() {
    const roles = await this.roleService.getAllRole();
    return roles;
  }

  @Post('getUserByRole')
  async getUserByRole(@Body() item: any) {
    const result = await this.roleService.getUserByRole(item);
    return result;
  }

  @Put('editRole')
  async editRole(@Body() editRoleDetails: EditRoleDto) {
    const editedRole = await this.roleService.editRole(editRoleDetails);
    return editedRole;
  }
}
