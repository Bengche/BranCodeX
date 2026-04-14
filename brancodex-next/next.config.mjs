/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from external domains used in your projects
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "flagcdn.com" },
    ],
  },
};

export default nextConfig;
