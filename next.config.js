/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Make sure you have disabled the mdxRs option for 
    // Next.js 13 / app dir, as it currently 
    // does not support Rehype plugins
    mdxRs: false
  },
  images:{ 
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
}

module.exports = nextConfig
