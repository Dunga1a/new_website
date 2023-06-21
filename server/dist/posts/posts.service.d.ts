import { Repository } from 'typeorm';
import { NewsPost, NewsCategory, User, Member } from 'src/utils/typeorm';
import { CreatePostDto } from './dtos/CreatePostDto.dtos';
import { UpdatePostDto } from './dtos/UpdatePostDto.dto';
export declare class PostsService {
    private readonly newsPostRepository;
    private readonly userRepository;
    private readonly memberRepository;
    private readonly newsCategoryRepository;
    constructor(newsPostRepository: Repository<NewsPost>, userRepository: Repository<User>, memberRepository: Repository<Member>, newsCategoryRepository: Repository<NewsCategory>);
    createPost(newsPostData: CreatePostDto, categoryId: number, userId: number): Promise<NewsPost>;
    approvePosts(postIds: number[]): Promise<NewsPost[]>;
    getPostById(id: number): Promise<NewsPost | "Không có dữ liệu">;
    getPostBySlug(slug: string): Promise<NewsPost | "Không có dữ liệu đâu">;
    updatePost(postId: number, updatePostData: UpdatePostDto): Promise<NewsPost>;
    searchByKeyword(keyword: string, page?: number, limit?: number): Promise<{
        postList: NewsPost[];
        total: number;
    }>;
    deletePost(postId: number): Promise<import("typeorm").DeleteResult>;
    deleteMultiple(ids: number[]): Promise<import("typeorm").DeleteResult>;
    getNewsByCategoryAndStatusWithPagination(category?: number | null, status?: boolean | null, page?: number, pageSize?: number, id?: number | null): Promise<{
        data: NewsPost[];
        count: number;
    }>;
    getAllPosts(status?: string, page?: number, pageSize?: number): Promise<{
        data: NewsPost[];
        count: number;
    }>;
}
