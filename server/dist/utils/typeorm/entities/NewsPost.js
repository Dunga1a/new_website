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
exports.NewsPost = void 0;
const typeorm_1 = require("typeorm");
const Members_1 = require("./Members");
const NewsCategory_1 = require("./NewsCategory");
const User_1 = require("./User");
let NewsPost = class NewsPost {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NewsPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => NewsCategory_1.NewsCategory),
    __metadata("design:type", NewsCategory_1.NewsCategory)
], NewsPost.prototype, "newsCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Members_1.Member, { eager: true }),
    __metadata("design:type", Members_1.Member)
], NewsPost.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { eager: true }),
    __metadata("design:type", User_1.User)
], NewsPost.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewsPost.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NewsPost.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], NewsPost.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], NewsPost.prototype, "subcontent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], NewsPost.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], NewsPost.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], NewsPost.prototype, "view", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], NewsPost.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NewsPost.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], NewsPost.prototype, "lastViewedAt", void 0);
NewsPost = __decorate([
    (0, typeorm_1.Entity)()
], NewsPost);
exports.NewsPost = NewsPost;
//# sourceMappingURL=NewsPost.js.map