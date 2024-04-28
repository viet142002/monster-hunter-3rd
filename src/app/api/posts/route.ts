import { PostAction } from '@/_actions';
import { Tag } from '@/types';

export async function POST(
    req: Request,
    context: { params: { [key: string]: string | string[] | undefined } }
) {
    const body = await req.json();

    const data = await PostAction.createPost(body);

    return Response.json({ message: 'Create post successfully', post: data });
}

export async function GET(
    req: Request,
    context: {
        params: { tag: Tag; [key: string]: string | string[] | undefined };
    }
) {
    const data = await PostAction.getAllPost({
        tag: context.params.tag,
    });

    return Response.json({ data });
}
