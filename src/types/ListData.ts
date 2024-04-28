import { Post } from '@/types/Post';

export interface ListData {
    data?: Array<Post>;
    error?: string;
}
