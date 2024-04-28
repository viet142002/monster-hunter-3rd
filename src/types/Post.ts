import { Tag } from '@/types/Tag';

export interface Post {
    id: string;
    title: string;
    body: string;
    tag: Tag;
    username: string;
    createdAt: string;
    updatedAt: string;
}
