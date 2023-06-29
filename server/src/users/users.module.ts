import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from '../utils/constants';
import { Contact, Role, User } from '../utils/typeorm';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { ContactModule } from 'src/contact/contact.module';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Contact]),
    RoleModule,
    MailModule,
    ContactModule,
  ],

  controllers: [UsersController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.MAILER,
      useClass: MailService,
    },
    {
      provide: Services.ROLE,
      useClass: RoleService,
    },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
})
export class UsersModule {}
