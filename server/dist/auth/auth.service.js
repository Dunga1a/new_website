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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const helpers_1 = require("../utils/helpers");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(userDetails) {
        const { password, username } = userDetails;
        const user = await this.userService.findByUsername(username);
        const isPasswordValid = await (0, helpers_1.compareHash)(password, user.password);
        console.log('2323', isPasswordValid);
        return isPasswordValid ? user : null;
    }
    async generateToken(userId) {
        return this.jwtService.sign(userId);
    }
    async validateToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.Services.USERS)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map