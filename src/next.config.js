/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    // Handle Figma asset imports
    config.resolve.alias['figma:asset'] = false;
    
    return config;
  },
}

module.exports = nextConfig