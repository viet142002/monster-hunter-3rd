import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { HeaderPrimary, MobileNav } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import StoreProvider from "@/redux/StoreProvider";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const APP_NAME = "Monster";
const APP_DEFAULT_TITLE = "Monster";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Hướng dẫn qua các bài đăng!";

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
};

export const viewport: Viewport = {
	themeColor: "#000000",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				style={{
					backgroundImage:
						"linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(4,4,33,1) 54%, rgba(0,0,0,1) 100%)",
				}}
				className={cn(
					"min-h-screen bg-background font-sans antialiased dark",
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
					<MobileNav />
					<div className='max-w-[1000px] mx-auto px-2 pb-4 md:mt-20'>
						{children}
					</div>
					<Toaster />
				</StoreProvider>
			</body>
		</html>
	);
}
