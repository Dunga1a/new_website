import { EditRole } from 'src/utils/types';
import { Role } from '../utils/typeorm';
import { CreateRoleDto } from './dtos/CreateRole.dto';

export interface IRoleService {
  createRole(userDetails: CreateRoleDto): Promise<Role>;
  getAllRole(): Promise<Role[]>;
  getById(id: string): Promise<Role>;
  getByName(name: string): Promise<Role>;
  getUserByRole(item: any);
  editRole(editRoleDetails: EditRole);
}
