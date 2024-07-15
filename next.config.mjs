// next.config.mjs

const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['via.placeholder.com'],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    }
  };
  
  export default nextConfig;
  