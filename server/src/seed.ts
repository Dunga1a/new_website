import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleService } from './role/role.service';
import { UserService } from './users/user.service';

async function main() {
  const app = await NestFactory.create(AppModule);
  const roleService = app.get(RoleService);
  const userService = app.get(UserService);

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
      console.log(`Vai trò đã được tạo: ${role.name}`);
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

  await app.close();
}

main();
