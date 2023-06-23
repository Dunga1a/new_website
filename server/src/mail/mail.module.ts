import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Contact, User } from 'src/utils/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'dunglm363@gmail.com',
          pass: 'yxjwylvaznvopygo',
        },
      },
    }),
    TypeOrmModule.forFeature([Contact, User]),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
