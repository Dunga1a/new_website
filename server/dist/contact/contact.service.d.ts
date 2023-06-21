import { Repository } from 'typeorm';
import { Contact } from '../utils/typeorm/entities/Contact';
import { IContactService } from './contact';
import { CreateContactDto } from './dtos/CreateContactDto.dto';
import { MailService } from 'src/mail/mail.service';
import { Reply } from 'src/utils/typeorm';
export declare class ContactService implements IContactService {
    private readonly contactRepository;
    private readonly mailService;
    private readonly relyRepository;
    constructor(contactRepository: Repository<Contact>, mailService: MailService, relyRepository: Repository<Reply>);
    createContact(contactDto: CreateContactDto): Promise<Contact>;
    getContactById(id: number): Promise<Contact | "Không có dữ liệu">;
    approveContactsOpen(contactIds: number[]): Promise<Contact[]>;
    approveContactsClose(contactIds: number[]): Promise<Contact[]>;
    deleteMultiple(ids: number[]): Promise<import("typeorm").DeleteResult>;
    getContactPage(page: number, pageSize: number): Promise<{
        data: Contact[];
        count: number;
    }>;
}
