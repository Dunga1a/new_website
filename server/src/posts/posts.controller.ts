import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Put,
  Param,
  Query,
  Delete,
  NotFoundException,
  DefaultValuePipe,
  ParseIntPipe,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IPostService } from './posts';
import { CreatePostDto } from './dtos/CreatePostDto.dtos';
import { NewsPost } from 'src/utils/typeorm';
import { UpdatePostDto } from './dtos/UpdatePostDto.dto';
import { UsersController } from 'src/users/user.controller';
import { Request } from 'express';

@Controller(Routes.NEWPOST)
export class PostsController {
  constructor(
    @Inject(Services.NEWPOST) private readonly newsPostsService: IPostService,
  ) {}

  @Post()
  createPost(@Body() newPostDto: CreatePostDto) {
    const { userId, categoryId, ...postData } = newPostDto;
    //console.log('đây là id', userId);

    if (!postData.title) {
      throw new HttpException('Vui lòng thêm tiêu đề', HttpStatus.NOT_FOUND);
    }
    if (!categoryId) {
      throw new HttpException(
        'Vui lòng tạo trước danh mục để thực hiện thêm bài viết',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.newsPostsService.createPost(postData, categoryId, userId);
  }

  @Post('/approve')
  async approvePosts(@Body() postIds: number[]) {
    try {
      const approvedPosts = await this.newsPostsService.approvePosts(postIds);
      return { message: 'Posts approved successfully', data: approvedPosts };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('all-new-posts')
  getAllPost(): Promise<NewsPost[]> {
    return this.newsPostsService.getAllPost();
  }
  @Get()
  async getNewsByCategoryAndStatusWithPagination(
    @Query('category') category: number | null,
    @Query('status') status: boolean | null,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 4,
    @Query('id') id?: number,
  ) {
    const data =
      await this.newsPostsService.getNewsByCategoryAndStatusWithPagination(
        category,
        status,
        page,
        pageSize,
        id,
      );

    return data;
  }

  @Get('allPost')
  async getAllPosts(
    status: string = '1',
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 4,
  ) {
    const data = await this.newsPostsService.getAllPosts(
      status,
      page,
      pageSize,
    );

    return data;
  }

  @Get('search')
  async searchByKeyword(
    @Query('keyword') keyword: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 4,
  ) {
    const searchResult = await this.newsPostsService.searchByKeyword(
      keyword,
      page,
      limit,
    );
    return searchResult;
  }

  @Get('/details/:id')
  async getPostById(@Param('id') id: number) {
    const post = await this.newsPostsService.getPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Get('/details-slug/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    const postBySlug = await this.newsPostsService.getPostBySlug(slug);
    //console.log(postBySlug);

    if (!postBySlug) {
      throw new NotFoundException('Post not found');
    }

    return postBySlug;
  }

  @Put('/update/:postId')
  updatePost(
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.newsPostsService.updatePost(postId, updatePostDto);
  }

  @Delete('/delete/:id')
  deletePost(@Param('id') postId: number) {
    return 'đã xóa' + this.newsPostsService.deletePost(postId);
  }

  @Post('deletes')
  async deleteMultiple(@Body() ids: number[]) {
    //console.log(ids);

    return await this.newsPostsService.deleteMultiple(ids);
  }

  @Get('getPostBySlugOfCategory/:item')
  async getPostBySlugOfCategory(
    @Param('item') item: any,
    @Query() queryParams: any,
  ) {
    const result = await this.newsPostsService.getPostBySlugOfCategory(
      item,
      queryParams,
    );
    return result;
  }

  @Get('getPostAction')
  async getNewsByAction(@Query() queryParams: any) {
    const result = await this.newsPostsService.getNewsByAction(queryParams);
    return result;
  }
}
