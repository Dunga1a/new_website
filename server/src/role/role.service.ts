/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IRoleService } from './role';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/CreateRole.dto';
import { EditRole } from 'src/utils/types';

@Injectable()
export class RoleService implements IRoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createRole(role: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({
      name: role.name,
    });

    if (existingRole)
      throw new HttpException('Quyền đã tồn tại ', HttpStatus.CONFLICT);
    const params = { name: role.name };
    const newRole = await this.roleRepository.create(params);
    const savedRole = await this.roleRepository.save(newRole);
    return savedRole;
  }

  async getAllRole(): Promise<Role[]> {
    const roles = await this.roleRepository.find();
    for (const role of roles) {
      const count = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role')
        .where('role.id = :id', { id: role.id })
        .getCount();

      role['count'] = count;
    }
    return roles;
  }

  async getById(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role)
      throw new HttpException('Quyền không tồn tại ', HttpStatus.NOT_FOUND);
    return role;
  }

  async getByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { name } });
    if (!role)
      throw new HttpException('Quyền không tồn tại ', HttpStatus.NOT_FOUND);
    return role;
  }

  async getUserByRole(item: any) {
    const getUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('role.id = :id', { id: item.id })
      .getMany();
    return getUser;
  }

  async editRole(editRoleDetails: EditRole) {
    const findRole = await this.roleRepository.findOne({
      id: editRoleDetails.id,
    });
    if (!findRole) {
      throw new HttpException('Không tìm thấy quyền', HttpStatus.CONFLICT);
    }
    findRole.name = editRoleDetails.name;
    const savedRole = await this.roleRepository.save(findRole);
    return savedRole;
  }
}
