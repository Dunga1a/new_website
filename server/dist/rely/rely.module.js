"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelyModule = void 0;
const common_1 = require("@nestjs/common");
const rely_service_1 = require("./rely.service");
const rely_controller_1 = require("./rely.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../utils/typeorm");
const constants_1 = require("../utils/constants");
const mail_module_1 = require("../mail/mail.module");
const mail_service_1 = require("../mail/mail.service");
let RelyModule = class RelyModule {
};
RelyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([typeorm_2.Reply, typeorm_2.Contact]), mail_module_1.MailModule],
        providers: [
            {
                provide: constants_1.Services.RELY,
                useClass: rely_service_1.RelyService,
            },
            {
                provide: constants_1.Services.MAILER,
                useClass: mail_service_1.MailService,
            },
        ],
        exports: [
            {
                provide: constants_1.Services.RELY,
                useClass: rely_service_1.RelyService,
            },
        ],
        controllers: [rely_controller_1.RelyController],
    })
], RelyModule);
exports.RelyModule = RelyModule;
//# sourceMappingURL=rely.module.js.map