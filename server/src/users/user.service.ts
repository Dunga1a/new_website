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
    console.log('username', username);

    const user = await this.findByUsername(username);
    const role = await this.roleService.getById(roleId);
    user.roles = [role];
    await this.userRepository.save(user);

    return user;
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
    console.log('đây là', userId);
    console.log('đây là e', email);
    const user = await this.userRepository.findOne(userId);
    console.log(user);

    user.email = email;
    await this.userRepository.save(user);
  }

  async changePassword(newPassword: string, id: string) {
    const user = await this.userRepository.findOne(id);
    user.password = newPassword;

    await this.userRepository.save(user);
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
}
