import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { INewsCategoryService } from './newscategory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsCategory, NewsPost } from 'src/utils/typeorm';
import {
  CreateNewsCategoryChildrenDto,
  CreateNewsCategoryDto,
} from './dtos/newscategory.dto';
import { NewsCategoryDetails } from 'src/utils/types';

@Injectable()
export class NewsCategoryService implements INewsCategoryService {
  constructor(
    @InjectRepository(NewsCategory)
    private readonly newsCategoryRepository: Repository<NewsCategory>,
    @InjectRepository(NewsPost)
    private readonly newsPostRepository: Repository<NewsPost>,
  ) {}

  async createNewsCategory(
    newsCategoryDetails: CreateNewsCategoryDto,
  ): Promise<NewsCategory> {
    const existingNewsCategory = await this.newsCategoryRepository.findOne({
      name: newsCategoryDetails.name,
    });

    if (existingNewsCategory) {
      throw new HttpException('Đã tồn tại danh mục này', HttpStatus.CONFLICT);
    }
    const newsCategory = await this.newsCategoryRepository.create(
      newsCategoryDetails,
    );
    const saveNewsCategory = await this.newsCategoryRepository.save(
      newsCategory,
    );
    return saveNewsCategory;
  }

  async createNewsCategoryChildren(
    newsCategoryDetailsChildren: CreateNewsCategoryChildrenDto,
  ): Promise<NewsCategory> {
    const existingNewsCategory = await this.newsCategoryRepository.findOne({
      name: newsCategoryDetailsChildren.name,
    });

    if (existingNewsCategory) {
      throw new HttpException('Đã tồn tại danh mục này', HttpStatus.CONFLICT);
    }
    const newsCategory = await this.newsCategoryRepository.create(
      newsCategoryDetailsChildren,
    );
    const saveNewsCategory = await this.newsCategoryRepository.save(
      newsCategory,
    );
    return saveNewsCategory;
  }

  async getAllNewsCategory(queryParams: any) {
    const pageSize = 10;
    const page = Number(queryParams.page);
    const countCategory = await this.newsCategoryRepository
      .createQueryBuilder('category')
      .getCount();
    const newsCategories = await this.newsCategoryRepository
      .createQueryBuilder('category')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
    for (const newsCategory of newsCategories) {
      const count = await this.newsPostRepository.count({
        newsCategory: newsCategory,
      });

      newsCategory['postCount'] = count;
    }

    return { newsCategories, countCategory };
  }

  async getOneCategory(id: number) {
    const getOneCategory = await this.newsCategoryRepository.findOne(id);
    return getOneCategory;
  }

  async editCategory(newsCategoryDetails: NewsCategoryDetails) {
    const newsCategoryDB = await this.newsCategoryRepository.findOne(
      newsCategoryDetails.news_category_id,
    );
    if (!newsCategoryDB) {
      throw new HttpException(
        'Không tìm thấy danh mục này',
        HttpStatus.NOT_FOUND,
      );
    }
    newsCategoryDB.name = newsCategoryDetails.name;
    newsCategoryDB.slug = newsCategoryDetails.slug;
    const savedNewsCategory = await this.newsCategoryRepository.save(
      newsCategoryDB,
    );

    console.log(newsCategoryDB);
    console.log(newsCategoryDetails);

    return savedNewsCategory;
  }

  async getOneCategoryById(id: number) {
    const query = this.newsCategoryRepository.createQueryBuilder('category');
    query.where('category.news_category_id = :id OR category.father_id = :id', {
      id,
    });
    const categories = await query.getMany();
    return categories;
  }

  async deletedOneNewsCategory(idNewsCategory: number) {
    const deletedNewsCategory = await this.newsCategoryRepository.delete(
      idNewsCategory,
    );
    return deletedNewsCategory;
  }

  async deleteManyNewsCategory(idNewsCategories: number[]) {
    const deletedMayMember = await this.newsCategoryRepository
      .createQueryBuilder()
      .delete()
      .where('news_category_id IN (:...idNewsCategories)', { idNewsCategories })
      .execute();
    if (deletedMayMember) {
      console.log('Bản ghi đã được xóa.');
    } else {
      console.log('Không tìm thấy bản ghi hoặc xóa thất bại.');
    }
  }
}