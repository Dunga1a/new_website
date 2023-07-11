import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/helpers';
import { Role, User } from '../utils/typeorm';
import { CreateUserDetails, Useremail, editUser } from '../utils/types';
import { IUserService } from './users';
import { Services } from 'src/utils/constants';
import { IRoleService } from 'src/role/role';
import { MailService } from 'src/mail/mail.service';
import * as fs from 'fs';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @Inject(Services.ROLE) private readonly roleService: IRoleService,
    private readonly mailService: MailService,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userRepository.findOne({
      username: userDetails.username,
    });

    const existingUserEmail = await this.userRepository.findOne({
      email: userDetails.email,
    });

    if (existingUser)
      throw new HttpException('Người dùng đã tồn tại', HttpStatus.CONFLICT);
    else if (existingUserEmail)
      throw new HttpException('Email đã tồn tại', HttpStatus.CONFLICT);

    const password = await hashPassword(userDetails.password);
    const params = {
      ...userDetails,
      password,
      status: 1,
    };

    const newUser = await this.userRepository.create(params);

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async createAdminUser(username: string, password: string) {
    const pass = await hashPassword(password);
    const adminUser = this.userRepository.create({
      username,
      password: pass,
    });
    const adminRole = await this.roleRepository.findOne({ name: 'admin' });
    adminUser.roles = [adminRole];
    return this.userRepository.save(adminUser);
  }

  async getUserPaginationAndStatus(
    status?: boolean | null,
    page: number = 1,
    pageSize: number = 4,
  ) {
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.userRepository
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.roles', 'Role')
      .leftJoinAndSelect('User.member', 'Member')
      .orderBy('User.created_at', 'DESC')
      .skip(skip)
      .take(pageSize);

    if (status !== null && status !== undefined) {
      queryBuilder.andWhere('User.status = :status', { status });
    }

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne(
      {
        username: username,
      },
      { relations: ['member'] },
    );
    if (!user) {
      throw new HttpException(
        'Tên đăng nhập không tồn tại ',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async editUser(editUser: editUser): Promise<User> {
    const { username, roleId } = editUser;
    //console.log('username', username);

    const user = await this.findByUsername(username);
    const role = await this.roleService.getById(roleId);
    user.roles = [role];
    await this.userRepository.save(user);

    return user;
  }

  async updateAvatarUser(userId: string, avatarUrl: string) {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.image = avatarUrl;
    const updateAvatar = await this.userRepository.save(user);
    return updateAvatar;
  }

  async forgetPassword(email: Useremail) {
    const findUserByEmail = await this.userRepository.findOne({
      where: email,
    });
    if (!findUserByEmail) {
      throw new HttpException('Không thấy người dùng', HttpStatus.NOT_FOUND);
    }

    const pass = await this.mailService.sendEmailForgetPassword(email);
    const password = await hashPassword(pass);
    findUserByEmail.password = password;
    await this.userRepository.save(findUserByEmail);
    return findUserByEmail;

    // return findUserByEmail;
  }

  async updateUserEmail(email: string, userId: string) {
    //console.log('đây là', userId);
    //console.log('đây là e', email);
    const user = await this.userRepository.findOne(userId);
    //console.log(user);

    user.email = email;
    return await this.userRepository.save(user);
  }

  async changePassword(newPassword: string, id: string) {
    const user = await this.userRepository.findOne(id);
    const password = await hashPassword(newPassword);
    user.password = password;

    return await this.userRepository.save(user);
  }

  async editUserProfile(userDetails: any, idUser: string) {
    try {
      const user = await this.userRepository.findOne(idUser);
      if (!user) {
        // Xử lý khi không tìm thấy người dùng
        throw new HttpException(
          'Không tìm thấy người dùng',
          HttpStatus.NOT_FOUND,
        );
      }

      user.firstname = userDetails.firstname;
      user.lastname = userDetails.lastname;
      user.gender = userDetails.gender;
      user.birthday = userDetails.birthday;
      user.signature = userDetails.signature;

      await this.userRepository.save(user);

      // Cập nhật thành công
    } catch (error) {
      console.log(error.message);

      throw new HttpException(
        'Không thay đổi được thông tin người dùng',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async approveUsersClose(userIds: number[]) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ status: 2 })
      .whereInIds(userIds)
      .execute();

    // Trả về danh sách các liên hệ đã được cập nhật
    const approvedContacts = await this.userRepository.findByIds(userIds);
    return approvedContacts;
  }

  async approveUsersOpen(userIds: number[]) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ status: 1 })
      .whereInIds(userIds)
      .execute();

    // Trả về danh sách các liên hệ đã được cập nhật
    const approvedUsers = await this.userRepository.findByIds(userIds);
    return approvedUsers;
  }

  async checkUserStatus(username: string) {
    const user = await this.userRepository.findOne({ username: username });
    return user ? user.status : 2;
  }

  async registerUser(createUser: any) {
    const exisUser = await this.userRepository.findOne({
      email: createUser.email,
    });
    if (exisUser) {
      throw new HttpException('Email này đã được đăng ký', HttpStatus.CONFLICT);
    }
    const exisUserByName = await this.userRepository.findOne({
      username: createUser.username,
    });
    if (exisUserByName) {
      throw new HttpException(
        'Tên người dùng đã được sử dụng',
        HttpStatus.CONFLICT,
      );
    }
    const password = await hashPassword(createUser.password);
    const registerUser = await this.userRepository.create({
      ...createUser,
      password,
    });

    const savedUser = await this.userRepository.save(registerUser);
    const findRole = await this.roleRepository.findOne({
      where: {
        name: 'user',
      },
    });
    if (!findRole) {
      throw new HttpException('Không tìm thấy quyền', HttpStatus.BAD_REQUEST);
    }

    await this.editUser({
      username: createUser.username,
      roleId: String(findRole.id),
    });

    return savedUser;
  }

  async updateImage(userId: string) {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ image: null })
      .where('id=:id', { id: userId })
      .execute();
  }
}
