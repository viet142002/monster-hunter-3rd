import { PostAction } from '@/_actions';

export async function GET(
    req: Request,
    context: {
        params: { id: string; [key: string]: string | string[] | undefined };
    }
) {
    const id = context.params.id;

    if (!id) {
        return Response.json({ message: 'Not found' }, { status: 404 });
    }
    const data = await PostAction.getPostById(context.params.id);
    return Response.json({ data });
}
