/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination:
          process.env.NEXT_PUBLIC_API_URL ??
          'http://localhost:9999' + '/:path*',
      },
    ]
  },
}

export default nextConfig
