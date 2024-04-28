import { HTMLRender } from '@/components/common';
import { getDetailData } from '@/services/get-data';
import { Post } from '@/types';

async function DetailPage({
    searchParams,
}: {
    searchParams: {
        type: string;
        id: string;
        [key: string]: string | undefined;
    };
}) {
    const { data } = await getDetailData(searchParams.id);

    return (
        <div>
            <h1>Detail Page</h1>
            <p>Type: {searchParams.type}</p>
            <p>ID: {searchParams.id}</p>

            <h2>{data.title}</h2>
            <HTMLRender htmlContent={data.body} />
        </div>
    );
}

export default DetailPage;
