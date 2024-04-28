import { PostAction } from '@/_actions';

export async function POST(
    req: Request,
    context: { params: { [key: string]: string | string[] | undefined } }
) {
    const body = await req.json();

    const data = await PostAction.createPost({
        title: body.title,
        body: body.body,
        tag: body.tag,
    });

    return Response.json({ message: 'Create post successfully', post: data });
}
