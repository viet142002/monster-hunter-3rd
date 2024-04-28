import { CardPost } from '@/components/common';
import { getListData } from '@/services/get-data';
import { Tag, Post } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function TypePage({
    searchParams,
}: {
    searchParams: { type: Tag; query?: { [key: string]: string } };
}) {
    const { type } = searchParams;

    if (!type || typeof type !== 'string') {
        return notFound();
    }
    const { data } = await getListData(type);

    return (
        <>
            <h1 className='text-xl'>{`Posts with tag: ${type}`}</h1>
            <nav>
                <ul className='grid gap-4 grid-cols-[repeat(auto-fit,300px)] justify-between'>
                    {data?.map((post: Post) => (
                        <li key={post.id}>
                            <Link href={`/${type}/${post.id}`}>
                                <CardPost post={post} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default TypePage;
