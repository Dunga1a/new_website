import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, User } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';
import { UsersModule } from 'src/users/users.module';
import { EmailService } from './email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member, User]), UsersModule],
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
