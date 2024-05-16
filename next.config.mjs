/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	disable: false,
	cacheOnFrontendNav: true,
	reloadOnOnline: true,
	aggressiveFrontEndNavCaching: true,
	workboxOptions: {
		disableDevLogs: true,
	},
});

export default withPWA({
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.pinimg.com",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: "/:type",
				destination: "/type",
			},
			{
				source: "/:type/:id",
				destination: "/detail",
			},
		];
	},
});
