/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/upload/:slug',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // 실제 서버 주소로 교체
            },
        ]
    },
}

module.exports = nextConfig
