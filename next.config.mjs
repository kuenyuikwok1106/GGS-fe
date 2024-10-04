
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
      },
    ],
  },
  transpilePackages: ['mui-tel-input'],
}

// Merge MDX config with Next.js config
export default nextConfig;