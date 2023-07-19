import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IMemberService } from './member';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Member, OrganizeMembershipTitle, Role, User } from 'src/utils/typeorm';
import { CreateMemberDetails, CreateUserDetails } from 'src/utils/types';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/users';

@Injectable()
export class MemberService implements IMemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(OrganizeMembershipTitle)
    private readonly organizeMembershipTitleRepository: Repository<OrganizeMembershipTitle>,

    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  async createMember(memberDetails: CreateMemberDetails): Promise<Member> {
    const findUserByEmail = await this.userRepository.findOne({
      email: memberDetails.email,
    });

    if (findUserByEmail) {
      throw new HttpException(
        'Email này đã được người dùng khác đăng ký',
        HttpStatus.CONFLICT,
      );
    }

    const findMemberByEmail = await this.memberRepository.findOne({
      email: memberDetails.email,
    });
    if (findMemberByEmail) {
      throw new HttpException(
        'Email này đã được hội viên khác đăng ký',
        HttpStatus.CONFLICT,
      );
    }

    const findMemberByUsername = await this.memberRepository.findOne({
      name_company: memberDetails.name_company,
    });
    if (findMemberByUsername) {
      throw new HttpException(
        'Tên doanh nghiệp này đã được hội viên khác đăng ký',
        HttpStatus.CONFLICT,
      );
    }

    const findUserByUsername = await this.userRepository.findOne({
      username: memberDetails.name_company,
    });
    if (findUserByUsername) {
      throw new HttpException(
        'Tên doanh nghiệp này đã được người dùng khác đăng ký',
        HttpStatus.CONFLICT,
      );
    }

    const newMember = await this.memberRepository.create(memberDetails);
    const saveMember = await this.memberRepository.save(newMember);
    return saveMember;
  }

  async getAllMember() {
    return await this.memberRepository.find();
  }

  async getAllMembers(queryParams: any) {
    const pageSize = 8;
    const page = Number(queryParams.page);
    const roleAssociationParam = Number(queryParams.roleAssociationParam);
    const businessIdParam = Number(queryParams.businessIdParam);
    const memberStatus = queryParams.memberStatus;

    const query = this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.id_role_associations', 'role_association')
      .leftJoinAndSelect('member.id_business_areas', 'business_area')

      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('member.id', 'DESC')
      .addOrderBy('role_association.id_organize_membership', 'DESC');

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

  async getAllMembersGroupBy() {
    const query = this.memberRepository
      .createQueryBuilder('member')
      .select([
        'MAX(member.id) as maxId',
        'member.name_company',
        'member.role_name',
        'member.representative',
        'member.phone',
        'member.email',
        'member.code_company',
        'member.image_person',
        'member.image_company',
        'member.website',
        'member.address',
        'member.intro',
        'member.slug',
        'member.status',
      ])
      .leftJoin('member.id_role_associations', 'role_association')
      .groupBy('role_association.id_organize_membership')
      .getMany();

    return query;
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
    const getRoleOrganize =
      await this.organizeMembershipTitleRepository.findOne({
        where: {
          name: 'Hội Viên',
        },
      });

    const query = this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('member.id_role_associations', 'role_association')
      .leftJoinAndSelect('member.id_business_areas', 'business_area')
      .where(
        `member.id_role_associations <> ${getRoleOrganize.id_organize_membership}`,
      )
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
      .where(
        `member.id_role_associations <> ${getRoleOrganize.id_organize_membership}`,
      );

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

      image: userMemberDetails.image,
    };
    const findRole = await this.roleRepository.findOne({
      where: {
        name: 'staff',
      },
    });
    if (!findRole) {
      throw new HttpException('Không tìm thấy quyền', HttpStatus.BAD_REQUEST);
    }

    const createUser = await this.userService.createUser(values);
    const savedUser = await this.userService.editUser({
      username: userMemberDetails.username,
      roleId: String(findRole.id),
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

  async editMember(memberEditDetails: any) {
    // console.log(memberEditDetails);

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

    if (memberEditDetails.editEmail) {
      const findMemberByEmail = await this.memberRepository.findOne({
        email: memberEditDetails.email,
      });
      if (findMemberByEmail) {
        throw new HttpException(
          'Email đã tồn tại, vui lòng chọn email khác',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (memberEditDetails.usernameEdit) {
      const findMemberByUsername = await this.memberRepository.findOne({
        name_company: memberEditDetails.name_company,
      });
      if (findMemberByUsername) {
        throw new HttpException(
          'Tên doanh nghiệp đã tồn tại, vui lòng chọn tên doanh nghiệp khác',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

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
    findUser.status = memberEditDetails.status;
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

  async checkError(errorDetails: any) {
    const findUserByEmail = await this.userRepository.findOne({
      email: errorDetails.email,
    });

    if (findUserByEmail) {
      throw new HttpException(
        'Email này đã được người dùng khác đăng ký',
        HttpStatus.CONFLICT,
      );
    }

    const findMemberByEmail = await this.memberRepository.findOne({
      email: errorDetails.email,
    });
    if (findMemberByEmail) {
      throw new HttpException(
        'Email này đã được hội viên khác đăng ký',
        HttpStatus.CONFLICT,
      );
    }

    const findMemberByUsername = await this.memberRepository.findOne({
      name_company: errorDetails.name_company,
    });
    if (findMemberByUsername) {
      throw new HttpException(
        'Tên doanh nghiệp này đã được hội viên khác đăng ký',
        HttpStatus.CONFLICT,
      );
    }

    const findUserByUsername = await this.userRepository.findOne({
      username: errorDetails.name_company,
    });
    if (findUserByUsername) {
      throw new HttpException(
        'Tên doanh nghiệp này đã được người dùng khác đăng ký',
        HttpStatus.CONFLICT,
      );
    }

    const findMemberByCodeCompany = await this.memberRepository.findOne({
      code_company: errorDetails.code_company,
    });
    if (findMemberByCodeCompany) {
      throw new HttpException(
        'Mã doanh nghiệp đã tồn tại',
        HttpStatus.CONFLICT,
      );
    }
  }
}
