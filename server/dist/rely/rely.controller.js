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
exports.RelyController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const Rely_dtos_1 = require("./dtos/Rely.dtos");
let RelyController = class RelyController {
    constructor(relyService) {
        this.relyService = relyService;
    }
    createRely(relyDto) {
        console.log(relyDto);
        return this.relyService.createRely(relyDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Rely_dtos_1.ReplyDto]),
    __metadata("design:returntype", Promise)
], RelyController.prototype, "createRely", null);
RelyController = __decorate([
    (0, common_1.Controller)(constants_1.Routes.RELY),
    __param(0, (0, common_1.Inject)(constants_1.Services.RELY)),
    __metadata("design:paramtypes", [Object])
], RelyController);
exports.RelyController = RelyController;
//# sourceMappingURL=rely.controller.js.map