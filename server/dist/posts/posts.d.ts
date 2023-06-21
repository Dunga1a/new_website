import { NewsPost } from 'src/utils/typeorm';
import { CreatePostDto } from './dtos/CreatePostDto.dtos';
import { UpdatePostDto } from './dtos/UpdatePostDto.dto';
export interface IPostService {
    getAllPosts(status: string, page: number, pageSize: number): any;
    getPostById(id: number): any;
    getPostBySlug(slug: string): any;
    getNewsByCategoryAndStatusWithPagination(category: number, status: boolean, page: number, pageSize: number, id: number): any;
    approvePosts(postId: number[]): any;
    createPost(postParams: CreatePostDto, categoryId: number): any;
    deletePost(id: number): any;
    deleteMultiple(ids: number[]): any;
    updatePost(postId: number, updatePostDto: UpdatePostDto): Promise<NewsPost>;
    searchByKeyword(keyword: string, page: number, limit: number): any;
}
