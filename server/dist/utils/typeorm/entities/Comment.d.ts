import { NewsPost } from './NewsPost';
import { User } from './User';
export declare class Comment {
    id: number;
    post: NewsPost;
    user: User;
    father_id: number;
    content: string;
    created_at: Date;
    status: number;
}
