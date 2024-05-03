import type { NextApiRequest, NextApiResponse } from 'next';
import { UserAction } from '@/_actions';
import { formatError } from '@/helpers/server';

export async function POST(req: Request) {
    const body = await req.json();
    console.log('🚀 ~ POST ~ body:', body);
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
