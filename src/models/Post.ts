import { Schema, model, models } from 'mongoose';

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            enum: [
                'pet',
                'weapon',
                'clothes',
                'quest',
                'guide',
                'download',
                'other',
            ],
            default: 'other',
        },
        // user: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // },
    },
    {
        timestamps: true,
    }
);

export const Post = models.Post || model('Post', postSchema);

export default Post;
