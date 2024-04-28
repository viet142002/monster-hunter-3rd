/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
        ],
    },
    rewrites: async () => {
        return [
            {
                source: '/:type',
                destination: '/type',
            },
            {
                source: '/:type/:id',
                destination: '/detail',
            },
        ];
    },
};

export default nextConfig;
