/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/upload/:slug',
                destination: 'http://localhost:9090/upload/:slug', // 실제 서버 주소로 교체
            },
        ]
    },
}

module.exports = nextConfig
