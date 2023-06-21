import { MailerService } from '@nestjs-modules/mailer';
import { Contact } from 'src/utils/typeorm';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendContact(contact: Contact): Promise<void>;
}
