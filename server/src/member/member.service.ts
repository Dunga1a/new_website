import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IMemberService } from './member';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Member, User } from 'src/utils/typeorm';
import { CreateMemberDetails } from 'src/utils/types';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/users';

@Injectable()
export class MemberService implements IMemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  async createMember(memberDetails: CreateMemberDetails): Promise<Member> {
    const findMemberByEmail = await this.memberRepository.findOne({
      email: memberDetails.email,
    });
    if (findMemberByEmail) {
      throw new HttpException(
        'Email này đã được đăng ký, vui lòng nhập email khác',
        HttpStatus.CONFLICT,
      );
    }
    const newMember = await this.memberRepository.create(memberDetails);
    const saveMember = await this.memberRepository.save(newMember);
    return saveMember;
  }

  async getAllMembers(queryParams: any) {
    const pageSize = 4;
    const page = Number(queryParams.page);
    const roleAssociationParam = Number(queryParams.roleAssociationParam);
    const businessIdParam = Number(queryParams.businessIdParam);
    const memberStatus = queryParams.memberStatus;

    const query = this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.id_role_associations', 'role_association')
      .leftJoinAndSelect('member.id_business_areas', 'business_area')

      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (roleAssociationParam) {
      query.andWhere(
        'role_association.id_organize_membership = :id_organize_membership',
        {
          id_organize_membership: roleAssociationParam,
        },
      );
    }

    if (businessIdParam) {
      query.andWhere('business_area.id_business_areas = :id_business_areas', {
        id_business_areas: businessIdParam,
      });
    }

    if (memberStatus) {
      query.andWhere('member.status = :status', {
        status: memberStatus,
      });
    }

    const queryCount = this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.id_role_associations', 'role_association')
      .leftJoinAndSelect('member.id_business_areas', 'business_area');

    if (roleAssociationParam) {
      queryCount.andWhere(
        'role_association.id_organize_membership = :id_organize_membership',
        {
          id_organize_membership: roleAssociationParam,
        },
      );
    }

    if (businessIdParam) {
      queryCount.andWhere(
        'business_area.id_business_areas = :id_business_areas',
        {
          id_business_areas: businessIdParam,
        },
      );
    }
    if (memberStatus || memberStatus === 0) {
      queryCount.andWhere('member.status = :status', {
        status: memberStatus,
      });
    }

    const memberList = await query.getMany();

    const countMemberList = await queryCount.getCount();

    return { memberList, countMemberList };
  }

  async getOneMember(idMember: number) {
    const memberOne = await this.memberRepository.findOne(idMember, {
      relations: ['id_role_associations', 'id_business_areas'],
    });
    return memberOne;
  }

  async getMemberByRole(queryParams: any) {
    const pageSize = 6;
    const page = Number(queryParams.page);
    const roleAssociationParam = Number(queryParams.roleAssociationParam);
    const businessIdParam = Number(queryParams.businessIdParam);
    const memberStatus = queryParams.memberStatus;

    const query = this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.id_role_associations', 'role_association')
      .leftJoinAndSelect('member.id_business_areas', 'business_area')
      .where('member.id_role_associations <> 1')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (roleAssociationParam) {
      query.andWhere(
        'role_association.id_organize_membership = :id_organize_membership',
        {
          id_organize_membership: roleAssociationParam,
        },
      );
    }

    if (businessIdParam) {
      query.andWhere('business_area.id_business_areas = :id_business_areas', {
        id_business_areas: businessIdParam,
      });
    }

    if (memberStatus) {
      query.andWhere('member.status = :status', {
        status: memberStatus,
      });
    }

    const queryCount = this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.id_role_associations', 'role_association')
      .leftJoinAndSelect('member.id_business_areas', 'business_area')
      .where('member.id_role_associations <> 1');

    if (roleAssociationParam) {
      queryCount.andWhere(
        'role_association.id_organize_membership = :id_organize_membership',
        {
          id_organize_membership: roleAssociationParam,
        },
      );
    }

    if (businessIdParam) {
      queryCount.andWhere(
        'business_area.id_business_areas = :id_business_areas',
        {
          id_business_areas: businessIdParam,
        },
      );
    }
    if (memberStatus || memberStatus === 0) {
      queryCount.andWhere('member.status = :status', {
        status: memberStatus,
      });
    }

    const memberList = await query.getMany();

    const countMemberList = await queryCount.getCount();

    return { memberList, countMemberList };
  }

  async confirmOneMember(userMemberDetails: any) {
    const values = {
      member: userMemberDetails.member,
      email: userMemberDetails.email,
      password: userMemberDetails.password,
      username: userMemberDetails.username,
      created_at: userMemberDetails.created_at,
    };
    console.log(values);

    const createUser = await this.userService.createUser(values);
    const savedUser = await this.userService.editUser({
      username: userMemberDetails.username,
      roleId: String(2),
    });
    const findMember = await this.memberRepository.findOne(
      userMemberDetails.member,
    );

    findMember.status = 1;
    const savedMember = await this.memberRepository.save(findMember);
    return { createUser, savedMember, savedUser };
  }

  async setStatusMember(idMember: number) {
    const findMember = await this.memberRepository.findOne(idMember);

    if (!findMember)
      throw new HttpException('Can not find member', HttpStatus.BAD_REQUEST);
    findMember.status = findMember.status === 1 ? 2 : 1;
    return this.memberRepository.save(findMember);
  }

  async editMember(memberEditDetails: Partial<Member>) {
    const findMember = await this.memberRepository.findOne(
      memberEditDetails.id,
    );

    const findUser = await this.userRepository.findOne({
      where: { member: memberEditDetails.id },
    });
    if (!findUser) {
      throw new HttpException(
        'Không tìm thấy tài khoản người dùng theo hội viên',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findMemberByEmail = await this.memberRepository.findOne({
      email: memberEditDetails.email,
    });

    if (!findMember) {
      throw new HttpException(
        'Không tìm thấy hội viên',
        HttpStatus.BAD_REQUEST,
      );
    }

    findMember.name_company = memberEditDetails.name_company;
    findMember.role_name = memberEditDetails.role_name;
    findMember.representative = memberEditDetails.representative;
    findMember.email = memberEditDetails.email;
    findMember.code_company = memberEditDetails.code_company;
    findMember.website = memberEditDetails.website;
    findMember.address = memberEditDetails.address;
    findMember.id_business_areas = memberEditDetails.id_business_areas;
    findMember.id_role_associations = memberEditDetails.id_role_associations;
    findMember.intro = memberEditDetails.intro;
    findMember.status = memberEditDetails.status;
    findMember.image_person = memberEditDetails.image_person;
    findMember.image_company = memberEditDetails.image_company;
    findUser.email = memberEditDetails.email;

    const updatedMember = await this.memberRepository.save(findMember);
    const updatedUser = await this.userRepository.save(findUser);
    return { updatedMember, updatedUser };
  }

  async deleteOneMember(idMember: number) {
    const repositoryMember = getRepository(Member);
    const deletedMember = await repositoryMember
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: idMember })
      .execute();

    if (deletedMember.affected === 1) {
      console.log('Bản ghi đã được xóa.');
    } else {
      console.log('Không tìm thấy bản ghi hoặc xóa thất bại.');
    }
  }

  async deleteManyMember(idMembers: number[]) {
    const deletedManyMember = await this.memberRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...idMembers)', {
        idMembers,
      })
      .execute();

    if (deletedManyMember) {
      console.log('Bản ghi đã được xóa.');
    } else {
      console.log('Không tìm thấy bản ghi hoặc xóa thất bại.');
    }
  }
}
