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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const typeorm_1 = require("typeorm");
const Reply_1 = require("./Reply");
let Contact = class Contact {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contact.prototype, "contact_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], Contact.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Contact.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Contact.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Reply_1.Reply, (reply) => reply.contact),
    __metadata("design:type", Array)
], Contact.prototype, "replies", void 0);
Contact = __decorate([
    (0, typeorm_1.Entity)()
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map