import { Contact } from '../utils/typeorm/entities/Contact';
import { CreateContactDto } from './dtos/CreateContactDto.dto';
import { IContactService } from './contact';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: IContactService);
    createContact(contactDto: CreateContactDto): Promise<Contact>;
    getAllContacts(page?: number, pageSize?: number): any;
    getContactById(id: number): any;
    deleteMultiple(ids: number[]): Promise<Contact[]>;
    approveOpen(ids: number[]): Promise<any>;
    approveClose(ids: number[]): Promise<any>;
}
