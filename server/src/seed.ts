import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleService } from './role/role.service';
import { UserService } from './users/user.service';
import { OrganizeMembershipTitleService } from './organize-membership-title/organize-membership-title.service';

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
      { name: 'staff' },
      { name: 'user' },
    ];

    for (const role of defaultRoles) {
      await roleService.createRole(role);
      `Vai trò đã được tạo: ${role.name}`;
    }

    // Tạo người dùng mặc định
    const defaultUser = {
      username: 'admin',
      password: 'admin',
    };

    await userService.createAdminUser(
      defaultUser.username,
      defaultUser.password,
    );

    console.log('Người dùng admin đã được tạo');
  } catch (error) {
    console.error('Lỗi khi tạo vai trò và người dùng mặc định:', error);
  }

  try {
    const defaultRoleOrganization = [{ name: 'Hội Viên' }];

    for (const role of defaultRoleOrganization) {
      await organizate.createOrganizations(role);
      console.log(`Vai trò đã được tạo: ${role.name}`);
    }
  } catch (error) {
    console.error('Lỗi khi tạo vai trò :', error);
  }

  await app.close();
}

main();
