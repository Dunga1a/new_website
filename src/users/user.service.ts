import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/helpers';
import { Image, Role, User } from '../utils/typeorm';
import {
  CreateUserDetails,
  dataUploadProfile,
  editUser,
  paramsUploadAvatar,
} from '../utils/types';
import { IUserService } from './users';
import { Services } from 'src/utils/constants';
import { IRoleService } from 'src/role/role';
import * as fs from 'fs';
import { IImageService } from 'src/image/image';
@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(Services.ROLE) private readonly roleService: IRoleService,
    @Inject(Services.IMAGE) private readonly imageService: IImageService,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    console.log('userDetails', userDetails);

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
    const params = { ...userDetails, password };

    const newUser = await this.userRepository.create(params);
    const role = await this.roleService.getByName('user');
    newUser.roles = [role];
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      username: username,
    });
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
    console.log('username', username);

    const user = await this.findByUsername(username);
    const role = await this.roleService.getById(roleId);
    user.roles = [role];
    await this.userRepository.save(user);

    return user;
  }

  async updateProfile(
    id: string,
    dataUploadProfile: dataUploadProfile,
  ): Promise<any> {
    const user = await this.findById(id);

    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const updateUser = await this.userRepository.update(id, dataUploadProfile);
    if (!updateUser) {
      throw new HttpException('Cập nhật thất bại', HttpStatus.NOT_FOUND);
    } else {
      return {
        message: 'Cập nhật thành công',
      };
    }
  }

  async updateAvatar(paramsUploadAvatar: paramsUploadAvatar): Promise<any> {
    const { id, file } = paramsUploadAvatar;
    const user = await this.findById(id);

    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    const saveImage = this.imageService.saveImage(file);
    user.image = {
      id: (await saveImage).id,
      filename: (await saveImage).filename,
    };
    const saveUser = this.userRepository.save(user);
    return saveUser;
  }
}
