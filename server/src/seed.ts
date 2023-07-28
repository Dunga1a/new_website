import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleService } from './role/role.service';
import { UserService } from './users/user.service';
import { OrganizeMembershipTitleService } from './organize-membership-title/organize-membership-title.service';
import { HttpStatus } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  const roleService = app.get(RoleService);
  const userService = app.get(UserService);
  const organizate = app.get(OrganizeMembershipTitleService);

  // Tạo tài khoản admin
  try {
    // Tạo vai trò mặc định
    const defaultRoles = [
      { name: 'admin' },
      { name: 'contentManager' },
      { name: 'staff' },
      { name: 'user' },
    ];

    for (const role of defaultRoles) {
      try {
        const existingRole = await roleService.getByName(role.name);
        console.log(`Chức vụ "${role.name}" đã tồn tại.`);
      } catch (error) {
        // Nếu chức vụ chưa tồn tại, tiến hành tạo chức vụ
        if (error.status === HttpStatus.NOT_FOUND) {
          await roleService.createRole(role);
          console.log(`Chức vụ đã được tạo: ${role.name}`);
        } else {
          console.error('Lỗi khi kiểm tra chức vụ:', error);
        }
      }
    }

    // Tạo người dùng mặc định
    const defaultUser = [
      {
        username: 'admin',
        password: 'admin',
      },
      {
        username: 'contentManager',
        password: 'contentManager',
      },
    ];

    for (const user of defaultUser) {
      console.log('user', user);
      await userService.createAdminUser(user.username, user.password);
    }
    console.log('Quản trị viên admin và contentManager đã được tạo');
  } catch (error) {
    console.error('Lỗi khi tạo vai trò và người dùng mặc định:', error);
  }

  try {
    const defaultRoleOrganization = [{ name: 'Hội Viên' }];

    for (const role of defaultRoleOrganization) {
      try {
        const existingRole = await organizate.getByName(role.name);
        console.log(`Chức vụ "${role.name}" đã tồn tại.`);
      } catch (error) {
        // Nếu chức vụ chưa tồn tại, tiến hành tạo chức vụ
        if (error.status === HttpStatus.NOT_FOUND) {
          await organizate.createOrganizations(role);
          console.log(`Chức vụ đã được tạo: ${role.name}`);
        } else {
          console.error('Lỗi khi kiểm tra chức vụ:', error);
        }
      }
    }
  } catch (error) {
    console.error('Lỗi khi tạo vai trò :', error);
  }

  await app.close();
}

main();
