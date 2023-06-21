import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../utils/typeorm/entities/Contact';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Services } from 'src/utils/constants';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { Reply } from 'src/utils/typeorm';
import { RelyModule } from 'src/rely/rely.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Reply]), MailModule, RelyModule],
  controllers: [ContactController],
  providers: [
    {
      provide: Services.CONTACT,
      useClass: ContactService,
    },
    {
      provide: Services.MAILER,
      useClass: MailService,
    },
  ],
  exports: [
    {
      provide: Services.CONTACT,
      useClass: ContactService,
    },
  ],
})
export class ContactModule {}
