import type { NextApiRequest, NextApiResponse } from 'next';
import { UserAction } from '@/_actions';
import { formatError } from '@/helpers/server';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    try {
        const data = await UserAction.login(body);
        return res.status(200).json(data);
    } catch (error: unknown) {
        res.status(500).json(formatError(error));
    }
}
