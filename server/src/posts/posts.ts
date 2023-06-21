import { NewsPost } from 'src/utils/typeorm';
import { CreatePostDto } from './dtos/CreatePostDto.dtos';
import { UpdatePostDto } from './dtos/UpdatePostDto.dto';

export interface IPostService {
  getAllPosts(status: string, page: number, pageSize: number);
  getPostById(id: number);
  getPostBySlug(slug: string);
  getNewsByCategoryAndStatusWithPagination(
    category: number,
    status: boolean,
    page: number,
    pageSize: number,
    id: number,
  );
  approvePosts(postId: number[]);
  createPost(postParams: CreatePostDto, categoryId: number);
  deletePost(id: number);
  deleteMultiple(ids: number[]);
  updatePost(postId: number, updatePostDto: UpdatePostDto): Promise<NewsPost>;
  searchByKeyword(keyword: string, page: number, limit: number);
  //paginationPost(page: number, pageSize: number): Promise<NewsPost[]>;
}
