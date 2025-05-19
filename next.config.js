/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Only on the server
    if (isServer) {
      return config;
    }

    // Don't try to resolve these modules on the client side
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      fs: false,
      crypto: false,
      'perf_hooks': false,
      os: false,
    };

    return config;
  },
  serverExternalPackages: ['postgres'],
};

module.exports = nextConfig; 