/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true, // Disable Image Optimization API as it's not needed for static exports
  },
  // Ensure that output directory is set to a custom directory to avoid conflicts
  distDir: '.next',
  // Enable static exports for Vercel
  output: 'export',
};

module.exports = nextConfig;
