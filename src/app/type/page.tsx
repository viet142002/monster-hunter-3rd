import { getListData } from '@/services/get-data';
import { Tag, Post } from '@/types';
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
            <ul>
                <li>
                    <ul>
                        {data?.map((post: Post) => (
                            <li key={post.id}>
                                <Link href={`/${type}/${post.id}`}>
                                    <h2>{post.title}</h2>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.body,
                                        }}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default TypePage;
