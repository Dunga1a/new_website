import { Role } from './Role';
import { Member } from './Members';
export declare class User {
    id: number;
    roles: Role[];
    member: Member;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    gender: number;
    birthday: Date;
    signature: string;
    question: string;
    answer: string;
    image: string;
    created_at: Date;
    log_out: Date;
    accuracy: boolean;
    safe: boolean;
    status: number;
}
