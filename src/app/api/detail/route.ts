import { PostAction } from '@/_actions';

export async function GET(
    req: Request,
    context: {
        params: { id: string; [key: string]: string | string[] | undefined };
    }
) {
    const data = await PostAction.getPostById(context.params.id);
    return Response.json({ data });
}
