/** @type {import('next').NextConfig} */

const images = {
  domains: [
  'http://localhost:8001'
  ],

}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
