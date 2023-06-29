import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OrganizeMembershipTitleService } from './organize-membership-title/organize-membership-title.service';
async function main() {
  const app = await NestFactory.create(AppModule);

  const organizate = app.get(OrganizeMembershipTitleService);

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
