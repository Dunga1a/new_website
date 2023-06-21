"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Contact_1 = require("../utils/typeorm/entities/Contact");
const contact_controller_1 = require("./contact.controller");
const contact_service_1 = require("./contact.service");
const constants_1 = require("../utils/constants");
const mail_module_1 = require("../mail/mail.module");
const mail_service_1 = require("../mail/mail.service");
const typeorm_2 = require("../utils/typeorm");
const rely_module_1 = require("../rely/rely.module");
let ContactModule = class ContactModule {
};
ContactModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Contact_1.Contact, typeorm_2.Reply]), mail_module_1.MailModule, rely_module_1.RelyModule],
        controllers: [contact_controller_1.ContactController],
        providers: [
            {
                provide: constants_1.Services.CONTACT,
                useClass: contact_service_1.ContactService,
            },
            {
                provide: constants_1.Services.MAILER,
                useClass: mail_service_1.MailService,
            },
        ],
        exports: [
            {
                provide: constants_1.Services.CONTACT,
                useClass: contact_service_1.ContactService,
            },
        ],
    })
], ContactModule);
exports.ContactModule = ContactModule;
//# sourceMappingURL=contact.module.js.map