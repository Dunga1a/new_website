import { IPostService } from './posts';
import { CreatePostDto } from './dtos/CreatePostDto.dtos';
import { NewsPost } from 'src/utils/typeorm';
import { UpdatePostDto } from './dtos/UpdatePostDto.dto';
export declare class PostsController {
    private readonly newsPostsService;
    constructor(newsPostsService: IPostService);
    createPost(newPostDto: CreatePostDto): any;
    approvePosts(postIds: number[]): Promise<{
        message: string;
        data: any;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
        data?: undefined;
    }>;
    getNewsByCategoryAndStatusWithPagination(category: number | null, status: boolean | null, page?: number, pageSize?: number, id?: number): Promise<any>;
    getAllPosts(status?: string, page?: number, pageSize?: number): Promise<any>;
    searchByKeyword(keyword: string, page: number, limit: number): Promise<any>;
    getPostById(id: number): Promise<any>;
    getPostBySlug(slug: string): Promise<any>;
    updatePost(postId: number, updatePostDto: UpdatePostDto): Promise<NewsPost>;
    deletePost(postId: number): string;
    deleteMultiple(ids: number[]): Promise<any>;
}
