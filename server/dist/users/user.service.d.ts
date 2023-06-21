import { Repository } from 'typeorm';
import { User } from '../utils/typeorm';
import { CreateUserDetails, editUser } from '../utils/types';
import { IUserService } from './users';
import { IRoleService } from 'src/role/role';
export declare class UserService implements IUserService {
    private readonly userRepository;
    private readonly roleService;
    constructor(userRepository: Repository<User>, roleService: IRoleService);
    createUser(userDetails: CreateUserDetails): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findById(id: string): Promise<User>;
    editUser(editUser: editUser): Promise<User>;
}
