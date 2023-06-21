import { Contact } from 'src/utils/typeorm';
import { CreateContactDto } from './dtos/CreateContactDto.dto';

export interface IContactService {
  createContact(contactParams: CreateContactDto);
  getContactById(id: number);
  getContactPage(page: number, pageSize: number);
  approveContactsOpen(contactIds: number[]);
  approveContactsClose(idContact: number[]);
  deleteMultiple(ids: number[]);
}
