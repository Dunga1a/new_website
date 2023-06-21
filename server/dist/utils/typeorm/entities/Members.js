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
exports.Member = void 0;
const typeorm_1 = require("typeorm");
const OrganizeMembershipTitle_1 = require("./OrganizeMembershipTitle");
const BusinessAreas_1 = require("./BusinessAreas");
let Member = class Member {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Member.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OrganizeMembershipTitle_1.OrganizeMembershipTitle),
    __metadata("design:type", OrganizeMembershipTitle_1.OrganizeMembershipTitle)
], Member.prototype, "id_role_associations", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BusinessAreas_1.BusinessAreas),
    __metadata("design:type", BusinessAreas_1.BusinessAreas)
], Member.prototype, "id_business_areas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "name_company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "role_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "representative", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "code_company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "image_person", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "image_company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "intro", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Member.prototype, "status", void 0);
Member = __decorate([
    (0, typeorm_1.Entity)()
], Member);
exports.Member = Member;
//# sourceMappingURL=Members.js.map