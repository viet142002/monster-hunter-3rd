import { UserAction } from '@/_actions';

export async function POST(req: Request) {
    const body = await req.json();
    try {
        const data = await UserAction.register(body);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: unknown) {
        throw error;
    }
}
