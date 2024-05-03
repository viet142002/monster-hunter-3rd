import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { HeaderPrimary } from '@/components/layout';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import StoreProvider from '@/redux/StoreProvider';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'Monster Hunter 3rd',
    description: 'Hướng dẫn chơi và mẹo Monster Hunter 3rd',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased dark',
                    fontSans.variable
                )}
            >
                <StoreProvider
                    initialState={{
                        auth: {
                            user: null,
                            token: null,
                        },
                    }}
                >
                    <NextTopLoader />
                    <HeaderPrimary />
                    <div className='max-w-[1000px] mx-auto p-4 mt-20'>
                        {children}
                    </div>
                    <Toaster />
                </StoreProvider>
            </body>
        </html>
    );
}
