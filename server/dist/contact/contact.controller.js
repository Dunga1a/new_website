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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const CreateContactDto_dto_1 = require("./dtos/CreateContactDto.dto");
const constants_1 = require("../utils/constants");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    createContact(contactDto) {
        console.log('đây' + contactDto);
        return this.contactService.createContact(contactDto);
    }
    getAllContacts(page = 1, pageSize = 4) {
        const data = this.contactService.getContactPage(page, pageSize);
        return data;
    }
    getContactById(id) {
        const contact = this.contactService.getContactById(id);
        return contact;
    }
    async deleteMultiple(ids) {
        console.log(ids);
        const deleteContact = await this.contactService.deleteMultiple(ids);
        return deleteContact;
    }
    async approveOpen(ids) {
        return await this.contactService.approveContactsOpen(ids);
    }
    async approveClose(ids) {
        return await this.contactService.approveContactsClose(ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateContactDto_dto_1.CreateContactDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "createContact", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "getAllContacts", null);
__decorate([
    (0, common_1.Get)('contactById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "getContactById", null);
__decorate([
    (0, common_1.Post)('deletesContact'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "deleteMultiple", null);
__decorate([
    (0, common_1.Put)('approve-open'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "approveOpen", null);
__decorate([
    (0, common_1.Put)('approve-close'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "approveClose", null);
ContactController = __decorate([
    (0, common_1.Controller)(constants_1.Routes.CONTACT),
    __param(0, (0, common_1.Inject)(constants_1.Services.CONTACT)),
    __metadata("design:paramtypes", [Object])
], ContactController);
exports.ContactController = ContactController;
//# sourceMappingURL=contact.controller.js.map