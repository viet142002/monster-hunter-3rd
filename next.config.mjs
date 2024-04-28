/** @type {import('next').NextConfig} */
const nextConfig = {
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
