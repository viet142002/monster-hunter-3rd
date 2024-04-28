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
        <Card className='max-w-[300px]'>
            <CardContent>
                <CardHeader>
                    <h2>{post?.user || 'Quốc Việt'}</h2>
                </CardHeader>
                <div className='aspect-[3/4] w-full overflow-hidden'>
                    <Image
                        src={post?.thumbnail || ImageUrl.thumbnail}
                        alt={post.title}
                        width={250}
                        height={300}
                        className='w-full h-full !object-cover rounded-md overflow-hidden'
                    />
                </div>
                <CardTitle className='pt-4'>{post.title}</CardTitle>
            </CardContent>

            <CardFooter>
                <span>{post.createdAt}</span>
            </CardFooter>
        </Card>
    );
}
