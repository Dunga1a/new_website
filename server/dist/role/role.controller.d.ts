import { IRoleService } from './role';
import { CreateRoleDto } from './dtos/CreateRole.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: IRoleService);
    createRole(role: CreateRoleDto): Promise<import("../utils/typeorm").Role>;
    getAllRole(): Promise<import("../utils/typeorm").Role[]>;
}
