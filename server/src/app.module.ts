import { RoleModule } from './role/role.module';
import { RoleController } from './role/role.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import entities from './utils/typeorm';
import { ContactModule } from './contact/contact.module';
import { RelyModule } from './rely/rely.module';
import { PostsModule } from './posts/posts.module';
import { MailModule } from './mail/mail.module';
import { NewscategoryModule } from './newscategory/newscategory.module';
import { EventModule } from './event/event.module';
import { OrganizeMembershipTitleModule } from './organize-membership-title/organize-membership-title.module';
import { BusinessAreasModule } from './business-areas/business-areas.module';
import { MemberModule } from './member/member.module';
import { CommentModule } from './comment/comment.module';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
  imports: [
    RoleModule,
    AuthModule,
    UsersModule,
    ContactModule,
    ConfigModule.forRoot({ envFilePath }),
    PassportModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities,
      logging: false,
    }),
    RelyModule,
    PostsModule,
    MailModule,
    NewscategoryModule,
    EventModule,
    OrganizeMembershipTitleModule,
    BusinessAreasModule,
    MemberModule,
    CommentModule,
  ],
  controllers: [],
})
export class AppModule {}
