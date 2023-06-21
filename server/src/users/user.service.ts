import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/helpers';
import { Role, User } from '../utils/typeorm';
import { CreateUserDetails, editUser } from '../utils/types';
import { IUserService } from './users';
import { Services } from 'src/utils/constants';
import { IRoleService } from 'src/role/role';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(Services.ROLE) private readonly roleService: IRoleService,
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
    const params = { ...userDetails, password };

    const newUser = await this.userRepository.create(params);

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
}
