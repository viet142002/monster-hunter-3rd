'use Server';

import { connect } from '@/lib/mongodb';
import Post from '@/models/Post';
import { Tag } from '@/types';

export const PostAction = {
    getAllPost: async ({
        tag = 'guide',
        query = {},
    }: {
        tag: Tag;
        query?: { [key: string]: string };
    }) => {
        await connect();
        const posts = await Post.find({
            tag: tag,
            ...query,
        }).exec();
        console.log('🚀 ~ posts:', posts);

        return posts;
    },
    createPost: async ({
        title,
        body,
        tag,
    }: {
        title: string;
        body: string;
        tag: Tag;
        // user?: string
    }) => {
        await connect();
        const post = new Post({
            title,
            body,
            tag,
            // user,
        });
        await post.save();
        return post;
    },
};
