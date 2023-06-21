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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../utils/typeorm");
const typeorm_3 = require("typeorm");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async createRole(role) {
        const existingRole = await this.roleRepository.findOne({
            name: role.name,
        });
        if (existingRole)
            throw new common_1.HttpException('Quyền đã tồn tại ', common_1.HttpStatus.CONFLICT);
        const params = { name: role.name };
        const newRole = await this.roleRepository.create(params);
        const savedRole = await this.roleRepository.save(newRole);
        return savedRole;
    }
    async getAllRole() {
        const roles = await this.roleRepository.find();
        return roles;
    }
    async getById(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role)
            throw new common_1.HttpException('Quyền không tồn tại ', common_1.HttpStatus.NOT_FOUND);
        return role;
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Role)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map