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
exports.BusinessAreas = void 0;
const typeorm_1 = require("typeorm");
let BusinessAreas = class BusinessAreas {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BusinessAreas.prototype, "id_business_areas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusinessAreas.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusinessAreas.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusinessAreas.prototype, "intro", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BusinessAreas.prototype, "status", void 0);
BusinessAreas = __decorate([
    (0, typeorm_1.Entity)()
], BusinessAreas);
exports.BusinessAreas = BusinessAreas;
//# sourceMappingURL=BusinessAreas.js.map