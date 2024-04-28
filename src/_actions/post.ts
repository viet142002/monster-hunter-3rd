import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { Post as PostType, Tag } from '@/types';

export const PostAction = {
    getAllPost: async ({
        tag = 'guide',
        query = {},
    }: {
        tag: Tag;
        query?: { [key: string]: string };
    }) => {
        try {
            await dbConnect();
            const posts = JSON.parse(
                JSON.stringify(
                    await Post.find({
                        tag: tag,
                        ...query,
                    }).exec()
                )
            );
            return posts;
        } catch (error) {
            return error;
        }
    },
    createPost: async ({ title, body, tag, thumbnail = '' }: PostType) => {
        await dbConnect();
        const post = new Post({
            title,
            body,
            tag,
            thumbnail,
            // user,
        });
        await post.save();
        return post;
    },
};