import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactService } from 'src/contact/contact.service';
import { Contact, Reply, User } from 'src/utils/typeorm';
import * as crypto from 'crypto';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async sendContact(contact: Contact) {
    await this.mailerService.sendMail({
      to: 'dunglm363@gmail.com',
      subject: contact.title,
      html: `<p>Topic: ${contact.topic}</p><p>Title: ${contact.title}</p><p>Email: ${contact.email}</p><p>Phone Number: ${contact.phone_number}</p><p>Address: ${contact.address}</p><p>Content: ${contact.content}</p>`,
    });
  }

  async sendReplyEmail(reply: Reply) {
    const contact = await this.contactRepository.findOne(
      reply.contact.contact_id,
    );
    console.log(contact);

    await this.mailerService.sendMail({
      from: 'Phòng truyền thông....',
      to: contact.email,
      subject: 'Phản hồi',
      html: reply.content,
    });
    contact.status = 1;
    await this.contactRepository.save(contact);
    console.log(reply);
  }

  sendEmailConfirmation(email: string, verificationCode: string) {
    console.log(verificationCode);

    this.mailerService.sendMail({
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    });
  }
}
