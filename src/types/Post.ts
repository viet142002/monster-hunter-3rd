import { Tag } from '@/types/Tag';

export interface Post {
    id: string;
    title: string;
    body: string;
    tag: Tag;
    thumbnail: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}
