import jwt from 'jsonwebtoken';

export function FixFindData(data: any) {
    return JSON.parse(JSON.stringify(data));
}

export function generateToken(data: any) {
    const secret = process.env.NEXT_PUBLIC_SECRET_TOKEN || 'secret';
    const token = jwt.sign({ data }, secret, {
        expiresIn: '1h',
    });
    return token;
}

export function verifyToken(token: string) {
    const secret = process.env.NEXT_PUBLIC_SECRET_TOKEN || 'secret';
    const data = jwt.verify(token, secret);
    return data;
}

export function formatError(error: unknown) {
    if (error instanceof Error) {
        return { message: error.message };
    }
    if (typeof error === 'string') {
        return { message: error };
    }
    return 'Unknown error';
}
