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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const CreatePostDto_dtos_1 = require("./dtos/CreatePostDto.dtos");
const UpdatePostDto_dto_1 = require("./dtos/UpdatePostDto.dto");
let PostsController = class PostsController {
    constructor(newsPostsService) {
        this.newsPostsService = newsPostsService;
    }
    createPost(newPostDto) {
        const { categoryId } = newPostDto, postData = __rest(newPostDto, ["categoryId"]);
        return this.newsPostsService.createPost(postData, categoryId);
    }
    async approvePosts(postIds) {
        try {
            const approvedPosts = await this.newsPostsService.approvePosts(postIds);
            return { message: 'Posts approved successfully', data: approvedPosts };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async getNewsByCategoryAndStatusWithPagination(category, status, page = 1, pageSize = 4, id) {
        const data = await this.newsPostsService.getNewsByCategoryAndStatusWithPagination(category, status, page, pageSize, id);
        return data;
    }
    async getAllPosts(status = '1', page = 1, pageSize = 4) {
        const data = await this.newsPostsService.getAllPosts(status, page, pageSize);
        return data;
    }
    async searchByKeyword(keyword, page, limit) {
        const searchResult = await this.newsPostsService.searchByKeyword(keyword, page, limit);
        return searchResult;
    }
    async getPostById(id) {
        const post = await this.newsPostsService.getPostById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async getPostBySlug(slug) {
        const postBySlug = await this.newsPostsService.getPostBySlug(slug);
        console.log(postBySlug);
        if (!postBySlug) {
            throw new common_1.NotFoundException('Post not found');
        }
        return postBySlug;
    }
    updatePost(postId, updatePostDto) {
        return this.newsPostsService.updatePost(postId, updatePostDto);
    }
    deletePost(postId) {
        return 'đã xóa' + this.newsPostsService.deletePost(postId);
    }
    async deleteMultiple(ids) {
        console.log(ids);
        return await this.newsPostsService.deleteMultiple(ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePostDto_dtos_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Post)('/approve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "approvePosts", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('pageSize')),
    __param(4, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getNewsByCategoryAndStatusWithPagination", null);
__decorate([
    (0, common_1.Get)('allPost'),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('keyword')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "searchByKeyword", null);
__decorate([
    (0, common_1.Get)('/details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Get)('/details-slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostBySlug", null);
__decorate([
    (0, common_1.Put)('/update/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdatePostDto_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('deletes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteMultiple", null);
PostsController = __decorate([
    (0, common_1.Controller)(constants_1.Routes.NEWPOST),
    __param(0, (0, common_1.Inject)(constants_1.Services.NEWPOST)),
    __metadata("design:paramtypes", [Object])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map