import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ImageUrl } from '@/constants';

import { Post } from '@/types';
import Image from 'next/image';

export function CardPost({ post }: { post: Post }) {
    return (
        <Card>
            <CardContent>
                <CardHeader>
                    <h2>{post?.user || 'Quốc Việt'}</h2>
                </CardHeader>
                <Image
                    src={post?.thumbnail || ImageUrl.thumbnail}
                    alt={post.title}
                    width={250}
                    height={300}
                    className='rounded-md'
                />
                <CardTitle className='pt-4'>{post.title}</CardTitle>
            </CardContent>

            <CardFooter>
                <span>{post.createdAt}</span>
            </CardFooter>
        </Card>
    );
}
