import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { Contact, Reply } from 'src/utils/typeorm';
export declare class MailService {
    private readonly mailerService;
    private readonly contactRepository;
    constructor(mailerService: MailerService, contactRepository: Repository<Contact>);
    sendContact(contact: Contact): Promise<void>;
    sendReplyEmail(reply: Reply): Promise<void>;
}
