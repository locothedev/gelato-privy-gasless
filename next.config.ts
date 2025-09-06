import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ignore test directories
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/.git',
        '**/packages/gelato-ui/tests/**',
        '**/packages/gelato-ui/**/*.test.*',
        '**/packages/gelato-ui/**/*.spec.*',
        '**/packages/gelato-ui/coverage/**'
      ]
    };
    
    return config;
  },
  typescript: {
    // Use the tsconfig.json which already excludes test files
    ignoreBuildErrors: false
  }
};

export default nextConfig;
