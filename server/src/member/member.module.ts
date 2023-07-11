import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, OrganizeMembershipTitle, Role, User } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';
import { UsersModule } from 'src/users/users.module';
import { EmailService } from './email.service';
import { RoleModule } from 'src/role/role.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    TypeOrmModule.forFeature([Member, User, Role, OrganizeMembershipTitle]),
    UsersModule,
    RoleModule,
  ],
  controllers: [MemberController],
  providers: [
    {
      provide: Services.MEMBER,
      useClass: MemberService,
    },
    EmailService,
  ],
})
export class MemberModule {}
