import { CreateContactDto } from './dtos/CreateContactDto.dto';
export interface IContactService {
    createContact(contactParams: CreateContactDto): any;
    getContactById(id: number): any;
    getContactPage(page: number, pageSize: number): any;
    approveContactsOpen(contactIds: number[]): any;
    approveContactsClose(idContact: number[]): any;
    deleteMultiple(ids: number[]): any;
}
