import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsPost, NewsCategory, User, Member } from 'src/utils/typeorm';
import { CreatePostDto } from './dtos/CreatePostDto.dtos';
import { UpdatePostDto } from './dtos/UpdatePostDto.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(NewsPost)
    private readonly newsPostRepository: Repository<NewsPost>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(NewsCategory)
    private readonly newsCategoryRepository: Repository<NewsCategory>,
  ) {}

  async createPost(
    newsPostData: CreatePostDto,
    categoryId: number,
    userId: number,
  ): Promise<NewsPost> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['roles', 'member'],
    });

    //const category = await this.newsCategoryRepository.findOne(categoryId, {relations:['member']});

    if (!user) {
      throw new HttpException(
        'Không có dữ liệu hội viên',
        HttpStatus.NOT_FOUND,
      );
    }

    const newsPost = new NewsPost();
    newsPost.title = newsPostData.title;
    newsPost.content = newsPostData.content;
    newsPost.subcontent = newsPostData.subcontent;
    newsPost.slug = newsPostData.slug;
    newsPost.image = newsPostData.image;
    newsPost.user = user;
    newsPost.newsCategory = new NewsCategory();
    newsPost.newsCategory.news_category_id = categoryId;

    const admin = user.roles.some((role) => role.name === 'admin');
    newsPost.status = admin ? true : false;

    const savedNewsPost = await this.newsPostRepository.save(newsPost);
    //console.log(savedNewsPost);
    if (user.member) {
      const member = await this.memberRepository.findOne(user.member.id);
      if (member) {
        savedNewsPost.member = member;
        await this.newsPostRepository.save(savedNewsPost);
      }
    }
    return savedNewsPost;
  }

  async getAllPost() {
    return await this.newsPostRepository.find();
  }

  async approvePosts(postIds: number[]) {
    const approvedPosts: NewsPost[] = [];

    for (const postId of postIds) {
      const post = await this.newsPostRepository.findOne(postId);

      if (!post) {
        throw new Error(`Post with ID ${postId} not found`);
      }

      // const isAdmin = post.user.roles.some((role) => role.name === 'admin');
      // if (!isAdmin) {
      //   throw new Error('You are not authorized to approve posts');
      // }

      post.status = true;
      const approvedPost = await this.newsPostRepository.save(post);
      approvedPosts.push(approvedPost);
    }

    return approvedPosts;
  }

  async getPostById(id: number) {
    const post = await this.newsPostRepository.findOne(id);
    if (!post) {
      throw new HttpException('Không có dữ liệu', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async getPostBySlug(slug: string) {
    const postBySlug = await this.newsPostRepository.findOne({
      where: { slug: slug },
    });
    if (!postBySlug) {
      throw new HttpException('Không có dữ liệu', HttpStatus.NOT_FOUND);
    }
    // Kiểm tra thời gian từ lần cuối cùng xem bài viết
    const currentTime = new Date().getTime();
    const lastViewedAt = postBySlug.lastViewedAt?.getTime() || 0;
    const elapsedTime = currentTime - lastViewedAt;

    // Nếu đã trôi qua 1 phút, tăng số lượt view và cập nhật thời gian xem mới nhất
    if (elapsedTime > 60000) {
      postBySlug.view += 1;
      postBySlug.lastViewedAt = new Date();
      await this.newsPostRepository.save(postBySlug);
    }
    return postBySlug;
  }

  async updatePost(postId: number, updatePostData: UpdatePostDto) {
    const post = await this.newsPostRepository.findOne(postId);
    if (!post) {
      throw new HttpException('Không tìm thấy bài viết', HttpStatus.NOT_FOUND);
    }

    post.title = updatePostData.title;
    post.subcontent = updatePostData.subcontent;
    post.content = updatePostData.content;
    post.slug = updatePostData.slug;
    post.image = updatePostData.image;

    const updatedPost = await this.newsPostRepository.save(post);

    return updatedPost;
  }

  async searchByKeyword(keyword: string, page: number = 1, limit: number = 2) {
    try {
      const query = await this.newsPostRepository
        .createQueryBuilder('newsPost')
        .where('newsPost.status = :status', { status: true })
        .andWhere(
          '(newsPost.title LIKE :keyword OR newsPost.content LIKE :keyword OR newsPost.subcontent LIKE :keyword)',
          { keyword: `%${keyword}%` },
        )
        .skip((page - 1) * limit)
        .take(limit);
      // .getMany();

      const countMany = await this.newsPostRepository
        .createQueryBuilder('newsPost')
        .where(
          '(newsPost.title LIKE :keyword OR newsPost.content LIKE :keyword OR newsPost.subcontent LIKE :keyword)',
          { keyword: `%${keyword}%` },
        )
        .andWhere('newsPost.status = :status', { status: true });

      // .getCount();

      // const [results, totalCount] = await query
      //   .orderBy('newsPost.created_at', 'DESC')

      //   .getManyAndCount();
      const postList = await query.getMany();
      const total = await countMany.getCount();
      return { postList, total };
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(postId: number) {
    const removePost = await this.newsPostRepository.delete(postId);
    return removePost;
  }

  async deleteMultiple(ids: number[]) {
    return await this.newsPostRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  async getNewsByCategoryAndStatusWithPagination(
    category?: number | null,
    status?: boolean | null,
    page: number = 1,
    pageSize: number = 4,
    id?: number | null,
  ) {
    const skip = (page - 1) * pageSize;
    const user = await this.userRepository.findOne(id);
    //console.log(user.roles.find((role) => console.log(role.name)));

    const queryBuilder = this.newsPostRepository
      .createQueryBuilder('NewsPost')
      .leftJoinAndSelect('NewsPost.newsCategory', 'NewsCategory')
      .leftJoinAndSelect('NewsPost.user', 'User')
      .leftJoinAndSelect('User.member', 'Member')
      .leftJoinAndSelect('User.roles', 'Role')
      //.where('NewsPost.status = :status', Ơ)
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
    } else {
      queryBuilder.andWhere('User.id = :id', { id: id });
    }

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }

  async getAllPosts(
    status: string = '1',
    page: number = 1,
    pageSize: number = 4,
  ) {
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.newsPostRepository
      .createQueryBuilder('NewsPost')
      .leftJoinAndSelect('NewsPost.newsCategory', 'NewsCategory')
      .leftJoinAndSelect('NewsPost.user', 'User')
      .leftJoinAndSelect('User.member', 'Member')
      .leftJoinAndSelect('User.roles', 'Role')
      //.where('NewsPost.status = :status', Ơ)
      .orderBy('NewsPost.created_at', 'DESC')
      .skip(skip)
      .take(pageSize);

    if (status !== null && status !== undefined) {
      queryBuilder.andWhere('NewsPost.status = :status', { status });
    }

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }

  async getPostBySlugOfCategory(item: any, queryParams: any) {
    const page = Number(queryParams.page);
    const pageSize = 8;
    const query = await this.newsPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.newsCategory', 'category')
      .where('category.news_category_id = :news_category_id', {
        news_category_id: item,
      })
      .orWhere('category.father_id = :father_id', { father_id: item })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const queryCount = await this.newsPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.newsCategory', 'category')
      .where('category.news_category_id = :news_category_id', {
        news_category_id: item,
      })
      .orWhere('category.father_id = :father_id', { father_id: item })
      .getCount();
    return { query, queryCount };
  }
}
