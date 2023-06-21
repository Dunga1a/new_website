import { Module } from '@nestjs/common';
import { RelyService } from './rely.service';
import { RelyController } from './rely.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact, Reply } from 'src/utils/typeorm';
import { Services } from 'src/utils/constants';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, Contact]), MailModule],
  providers: [
    {
      provide: Services.RELY,
      useClass: RelyService,
    },
    {
      provide: Services.MAILER,
      useClass: MailService,
    },
  ],
  exports: [
    {
      provide: Services.RELY,
      useClass: RelyService,
    },
  ],
  controllers: [RelyController],
})
export class RelyModule {}
