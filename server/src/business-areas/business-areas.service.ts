import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IBusinessAreasService } from './business-areas';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessAreas } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { BusinessAreasDetails } from 'src/utils/types';

@Injectable()
export class BusinessAreasService implements IBusinessAreasService {
  constructor(
    @InjectRepository(BusinessAreas)
    private readonly businessAreasRepository: Repository<BusinessAreas>,
  ) {}

  async getStaticBusinessAreas() {
    const businessAreaList = await this.businessAreasRepository.find();
    return businessAreaList;
  }

  async getAllBusinessAreas(queryParams: any) {
    const pageSize = 6;
    const searchKey = String(queryParams.searchKey);

    const page = Number(queryParams.page);
    const query = this.businessAreasRepository
      .createQueryBuilder('business-area')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('business-area.id_business_areas', 'DESC');

    if (searchKey) {
      query.andWhere('business-area.name LIKE :searchKey', {
        searchKey: `%${searchKey}%`,
      });
    }

    const queryCount =
      this.businessAreasRepository.createQueryBuilder('business-area');
    if (searchKey) {
      queryCount.andWhere('business-area.name LIKE :searchKey', {
        searchKey: `%${searchKey}%`,
      });
    }
    const businessAreas = await query.getMany();
    const countBusinessAreas = await queryCount.getCount();

    return { businessAreas, countBusinessAreas };
  }

  async createBusinessAreas(createBusinessDetails: BusinessAreasDetails) {
    const findBusinessAreas = await this.businessAreasRepository.findOne({
      slug: createBusinessDetails.slug,
    });
    if (findBusinessAreas) {
      throw new HttpException(
        'Đã tồn tại lĩnh vực này',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createBusinessArea = await this.businessAreasRepository.create(
      createBusinessDetails,
    );
    const saved = await this.businessAreasRepository.save(createBusinessArea);

    return saved;
  }

  async getOneBusinessAreas(id: number) {
    const businessAreaOne = await this.businessAreasRepository.findOne(id);
    return businessAreaOne;
  }

  async editOneBusinessAreas(editBusinessDetails: BusinessAreasDetails) {
    const businessArea = await this.businessAreasRepository.findOne(
      editBusinessDetails.id_business_areas,
    );
    if (!businessArea) {
      throw new HttpException(
        'Không Tìm Thấy Lĩnh Vực Hoạt Động Này',
        HttpStatus.NOT_FOUND,
      );
    }

    businessArea.name = editBusinessDetails.name;
    businessArea.intro = editBusinessDetails.intro;
    businessArea.slug = editBusinessDetails.slug;
    businessArea.status = editBusinessDetails.status;
    const savedBusinessArea = await this.businessAreasRepository.save(
      businessArea,
    );

    return savedBusinessArea;
  }

  async updateStatusOnManyBusinessArea(ids: number[], status: number) {
    const updatedQuery = await this.businessAreasRepository
      .createQueryBuilder()
      .update(BusinessAreas);

    if (status === 1) {
      updatedQuery.set({ status: 1 }).whereInIds(ids);
    }
    if (status === 2) {
      updatedQuery.set({ status: 0 }).whereInIds(ids);
    }
    const updatedStatus = updatedQuery.execute();
    return updatedStatus;
  }
}
