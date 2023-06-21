import { Reply } from './Reply';
export declare class Contact {
    contact_id: number;
    topic: string;
    username: string;
    title: string;
    email: string;
    phone_number: string;
    address: string;
    content: string;
    status: number;
    created_at: Date;
    replies: Reply[];
}
