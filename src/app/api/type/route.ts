export async function GET(
    req: Request,
    context: { params: { [key: string]: string | string[] | undefined } }
) {
    const { params } = context;

    if (params && params?.type) {
        return new Response(
            JSON.stringify({ message: `GET /api/${context.params.type}` }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    return Response.json({ message: 'GET /api/route' });
}
