import { PostAction } from '@/_actions';
import { Tag } from '@/types';
import { ListData } from '@/types';

export const getListData = async (
    type: Tag,
    query?: { [key: string]: string }
): Promise<ListData> => {
    try {
        const data = await PostAction.getAllPost({ tag: type, query: query });

        return { data };
    } catch (error: any) {
        return { error: error.message };
    }
};
