import { IRoleService } from './role';
import { Role } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/CreateRole.dto';
export declare class RoleService implements IRoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    createRole(role: CreateRoleDto): Promise<Role>;
    getAllRole(): Promise<Role[]>;
    getById(id: string): Promise<Role>;
}
