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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const helpers_1 = require("../utils/helpers");
const typeorm_3 = require("../utils/typeorm");
const constants_1 = require("../utils/constants");
let UserService = class UserService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    async createUser(userDetails) {
        const existingUser = await this.userRepository.findOne({
            username: userDetails.username,
        });
        const existingUserEmail = await this.userRepository.findOne({
            email: userDetails.email,
        });
        if (existingUser)
            throw new common_1.HttpException('Người dùng đã tồn tại', common_1.HttpStatus.CONFLICT);
        else if (existingUserEmail)
            throw new common_1.HttpException('Email đã tồn tại', common_1.HttpStatus.CONFLICT);
        const password = await (0, helpers_1.hashPassword)(userDetails.password);
        const params = Object.assign(Object.assign({}, userDetails), { password });
        const newUser = await this.userRepository.create(params);
        const savedUser = await this.userRepository.save(newUser);
        return savedUser;
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({
            username: username,
        });
        if (!user) {
            throw new common_1.HttpException('Tên đăng nhập không tồn tại ', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async editUser(editUser) {
        const { username, roleId } = editUser;
        console.log('username', username);
        const user = await this.findByUsername(username);
        const role = await this.roleService.getById(roleId);
        user.roles = [role];
        await this.userRepository.save(user);
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.User)),
    __param(1, (0, common_1.Inject)(constants_1.Services.ROLE)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map