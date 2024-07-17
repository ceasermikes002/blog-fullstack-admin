const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'localhost'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Add the port if you're running your development server on a specific port
      },
    ],
  },
};

export default nextConfig;
