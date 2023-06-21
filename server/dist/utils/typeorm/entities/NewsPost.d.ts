import { Member } from './Members';
import { NewsCategory } from './NewsCategory';
import { User } from './User';
export declare class NewsPost {
    id: number;
    newsCategory: NewsCategory;
    member: Member;
    user: User;
    title: string;
    created_at: Date;
    status: boolean;
    subcontent: string;
    content: string;
    image: string;
    view: number;
    rating: number;
    slug: string;
    lastViewedAt: Date;
}
