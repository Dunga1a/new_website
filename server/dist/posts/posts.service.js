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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("../utils/typeorm");
let PostsService = class PostsService {
    constructor(newsPostRepository, userRepository, memberRepository, newsCategoryRepository) {
        this.newsPostRepository = newsPostRepository;
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.newsCategoryRepository = newsCategoryRepository;
    }
    async createPost(newsPostData, categoryId, userId) {
        const user = await this.userRepository.findOne(userId, {
            relations: ['roles', 'member'],
        });
        if (!user) {
            throw new Error('Member not found');
        }
        const newsPost = new typeorm_3.NewsPost();
        newsPost.title = newsPostData.title;
        newsPost.content = newsPostData.content;
        newsPost.subcontent = newsPostData.subcontent;
        newsPost.slug = newsPostData.slug;
        newsPost.image = newsPostData.image;
        newsPost.user = user;
        newsPost.newsCategory = new typeorm_3.NewsCategory();
        newsPost.newsCategory.news_category_id = categoryId;
        const admin = user.roles.some((role) => role.name === 'admin');
        newsPost.status = admin ? true : false;
        const savedNewsPost = await this.newsPostRepository.save(newsPost);
        if (user.member) {
            const member = await this.memberRepository.findOne(user.member.id);
            if (member) {
                savedNewsPost.member = member;
                await this.newsPostRepository.save(savedNewsPost);
            }
        }
        return savedNewsPost;
    }
    async approvePosts(postIds) {
        const approvedPosts = [];
        for (const postId of postIds) {
            const post = await this.newsPostRepository.findOne(postId);
            if (!post) {
                throw new Error(`Post with ID ${postId} not found`);
            }
            post.status = true;
            const approvedPost = await this.newsPostRepository.save(post);
            approvedPosts.push(approvedPost);
        }
        return approvedPosts;
    }
    async getPostById(id) {
        const post = await this.newsPostRepository.findOne(id);
        if (!post) {
            return 'Không có dữ liệu';
        }
        return post;
    }
    async getPostBySlug(slug) {
        var _a;
        const postBySlug = await this.newsPostRepository.findOne({
            where: { slug: slug },
        });
        if (!postBySlug) {
            return 'Không có dữ liệu đâu';
        }
        const currentTime = new Date().getTime();
        const lastViewedAt = ((_a = postBySlug.lastViewedAt) === null || _a === void 0 ? void 0 : _a.getTime()) || 0;
        const elapsedTime = currentTime - lastViewedAt;
        if (elapsedTime > 60000) {
            postBySlug.view += 1;
            postBySlug.lastViewedAt = new Date();
            await this.newsPostRepository.save(postBySlug);
        }
        return postBySlug;
    }
    async updatePost(postId, updatePostData) {
        const post = await this.newsPostRepository.findOne(postId);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        post.title = updatePostData.title;
        post.subcontent = updatePostData.subcontent;
        post.content = updatePostData.content;
        post.slug = updatePostData.slug;
        post.image = updatePostData.image;
        const updatedPost = await this.newsPostRepository.save(post);
        return updatedPost;
    }
    async searchByKeyword(keyword, page = 1, limit = 2) {
        console.log(keyword);
        try {
            const query = await this.newsPostRepository
                .createQueryBuilder('newsPost')
                .where('newsPost.status = :status', { status: true })
                .andWhere('(newsPost.title LIKE :keyword OR newsPost.content LIKE :keyword OR newsPost.subcontent LIKE :keyword)', { keyword: `%${keyword}%` })
                .skip((page - 1) * limit)
                .take(limit);
            const countMany = await this.newsPostRepository
                .createQueryBuilder('newsPost')
                .where('(newsPost.title LIKE :keyword OR newsPost.content LIKE :keyword OR newsPost.subcontent LIKE :keyword)', { keyword: `%${keyword}%` })
                .andWhere('newsPost.status = :status', { status: true });
            const postList = await query.getMany();
            const total = await countMany.getCount();
            return { postList, total };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deletePost(postId) {
        const removePost = await this.newsPostRepository.delete(postId);
        return removePost;
    }
    async deleteMultiple(ids) {
        return await this.newsPostRepository
            .createQueryBuilder()
            .delete()
            .where('id IN (:...ids)', { ids })
            .execute();
    }
    async getNewsByCategoryAndStatusWithPagination(category, status, page = 1, pageSize = 4, id) {
        const skip = (page - 1) * pageSize;
        const user = await this.userRepository.findOne(id);
        const queryBuilder = this.newsPostRepository
            .createQueryBuilder('NewsPost')
            .leftJoinAndSelect('NewsPost.newsCategory', 'NewsCategory')
            .leftJoinAndSelect('NewsPost.user', 'User')
            .leftJoinAndSelect('User.member', 'Member')
            .leftJoinAndSelect('User.roles', 'Role')
            .orderBy('NewsPost.created_at', 'DESC')
            .skip(skip)
            .take(pageSize);
        if (category !== null && category !== undefined) {
            queryBuilder.andWhere('NewsCategory.news_category_id = :category', {
                category,
            });
        }
        if (status !== null && status !== undefined) {
            queryBuilder.andWhere('NewsPost.status = :status', { status });
        }
        if (user.roles.find((role) => role.name === 'admin')) {
            console.log('đây là admin');
        }
        else {
            queryBuilder.andWhere('User.id = :id', { id: id });
        }
        const [data, count] = await queryBuilder.getManyAndCount();
        return { data, count };
    }
    async getAllPosts(status = '1', page = 1, pageSize = 4) {
        const skip = (page - 1) * pageSize;
        const queryBuilder = this.newsPostRepository
            .createQueryBuilder('NewsPost')
            .leftJoinAndSelect('NewsPost.newsCategory', 'NewsCategory')
            .leftJoinAndSelect('NewsPost.user', 'User')
            .leftJoinAndSelect('User.member', 'Member')
            .leftJoinAndSelect('User.roles', 'Role')
            .orderBy('NewsPost.created_at', 'DESC')
            .skip(skip)
            .take(pageSize);
        if (status !== null && status !== undefined) {
            queryBuilder.andWhere('NewsPost.status = :status', { status });
        }
        const [data, count] = await queryBuilder.getManyAndCount();
        return { data, count };
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_3.NewsPost)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.User)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_3.Member)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_3.NewsCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map