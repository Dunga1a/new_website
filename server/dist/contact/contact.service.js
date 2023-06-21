"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Contact_1 = require("../utils/typeorm/entities/Contact");
const mail_service_1 = require("../mail/mail.service");
const typeorm_3 = require("../utils/typeorm");
let ContactService = class ContactService {
    constructor(contactRepository, mailService, relyRepository) {
        this.contactRepository = contactRepository;
        this.mailService = mailService;
        this.relyRepository = relyRepository;
    }
    async createContact(contactDto) {
        const contact = this.contactRepository.create(contactDto);
        await this.contactRepository.save(contact);
        await this.mailService.sendContact(contact);
        return contact;
    }
    async getContactById(id) {
        const contact = await this.contactRepository.findOne(id, {
            relations: ['replies'],
        });
        if (!contact) {
            return 'Không có dữ liệu';
        }
        return contact;
    }
    async approveContactsOpen(contactIds) {
        await this.contactRepository
            .createQueryBuilder()
            .update(Contact_1.Contact)
            .set({ status: 1 })
            .whereInIds(contactIds)
            .execute();
        const approvedContacts = await this.contactRepository.findByIds(contactIds);
        return approvedContacts;
    }
    async approveContactsClose(contactIds) {
        await this.contactRepository
            .createQueryBuilder()
            .update(Contact_1.Contact)
            .set({ status: 0 })
            .whereInIds(contactIds)
            .execute();
        const approvedContacts = await this.contactRepository.findByIds(contactIds);
        return approvedContacts;
    }
    async deleteMultiple(ids) {
        await this.relyRepository
            .createQueryBuilder()
            .delete()
            .where('contact IN (:...ids)', { ids })
            .execute();
        return await this.contactRepository
            .createQueryBuilder()
            .delete()
            .where('contact_id IN (:...ids)', { ids })
            .execute();
    }
    async getContactPage(page, pageSize) {
        const skip = (page - 1) * pageSize;
        const queryBuilder = this.contactRepository
            .createQueryBuilder('Contact')
            .leftJoinAndSelect('Contact.replies', 'Reply')
            .orderBy('Contact.created_at', 'DESC')
            .skip(skip)
            .take(pageSize);
        const [data, count] = await queryBuilder.getManyAndCount();
        return { data, count };
    }
};
ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Contact_1.Contact)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_3.Reply)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService,
        typeorm_2.Repository])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map