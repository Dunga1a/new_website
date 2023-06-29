import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizeMembershipTitle } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { IOrganizeMembershipTitleService } from './organize-membership-title';
import { OrganizationDetails } from 'src/utils/types';

@Injectable()
export class OrganizeMembershipTitleService
  implements IOrganizeMembershipTitleService
{
  constructor(
    @InjectRepository(OrganizeMembershipTitle)
    private readonly organizeMembershipTitleRepository: Repository<OrganizeMembershipTitle>,
  ) {}

  async getAllOrganizations(queryParams: any) {
    const searchKey = String(queryParams.searchKey);
    const query = this.organizeMembershipTitleRepository.createQueryBuilder(
      'organize-membership',
    );
    if (searchKey) {
      console.log(searchKey);

      query.andWhere('organize-membership.name LIKE :searchKey', {
        searchKey: `%${searchKey}%`,
      });
    }
    const organizations = await query.getMany();
    return organizations;
  }

  async createOrganizations(createOrganizationsDetails: OrganizationDetails) {
    const findOrganizationByName =
      await this.organizeMembershipTitleRepository.find({
        where: {
          name: createOrganizationsDetails.name,
        },
      });
    if (findOrganizationByName) {
      throw new HttpException('Chức vụ này đã tồn tại', HttpStatus.NOT_FOUND);
    }
    const createOrganizations =
      await this.organizeMembershipTitleRepository.create(
        createOrganizationsDetails,
      );
    const saved = await this.organizeMembershipTitleRepository.save(
      createOrganizations,
    );
    return saved;
  }

  async editOrganizations(editOrganizationsDetails: OrganizationDetails) {
    console.log(editOrganizationsDetails);
    if (editOrganizationsDetails.isEdit) {
      const findOrganizationDB =
        await this.organizeMembershipTitleRepository.findOne({
          where: {
            name: editOrganizationsDetails.name,
          },
        });
      if (findOrganizationDB) {
        throw new HttpException('Chức vụ đã tồn tại', HttpStatus.NOT_FOUND);
      }
    }

    const organizationDB = await this.organizeMembershipTitleRepository.findOne(
      editOrganizationsDetails.id_organize_membership,
    );
    if (!organizationDB) {
      throw new HttpException(
        'Không tìm thấy chức vụ này trong hội',
        HttpStatus.NOT_FOUND,
      );
    }
    organizationDB.name = editOrganizationsDetails.name;
    organizationDB.status = editOrganizationsDetails.status;
    const savedOrganizations =
      await this.organizeMembershipTitleRepository.save(organizationDB);
    return savedOrganizations;
  }

  async updateStatusOnManyOrganize(ids: number[], status: number) {
    const updateQuery = this.organizeMembershipTitleRepository
      .createQueryBuilder()
      .update(OrganizeMembershipTitle);

    if (status === 1) {
      updateQuery.set({ status: true }).whereInIds(ids);
    }
    if (status === 2) {
      updateQuery.set({ status: false }).whereInIds(ids);
    }
    const updateStatus = await updateQuery.execute();
    return updateStatus;
  }

  async deleteManyOrganize(ids: number[]) {
    const deletedManyOrganize = await this.organizeMembershipTitleRepository
      .createQueryBuilder()
      .delete()
      .where('id_organize_membership IN (:...ids)', {
        ids,
      })
      .execute();
    if (deletedManyOrganize) {
      console.log('Bản ghi đã được xóa.');
    } else {
      console.log('Không tìm thấy bản ghi hoặc xóa thất bại.');
    }
  }
}
