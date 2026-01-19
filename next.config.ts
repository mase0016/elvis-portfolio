import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // --- MANDATORY FOR GITHUB PAGES ---
  output: 'export', // Generates the static 'out' folder

  // 1. ADD THIS: Fixes 404 errors when refreshing a page
  trailingSlash: true, // Changes /about to /about/index.html

  images: {
    unoptimized: true, // Required: GitHub Pages has no image server

    deviceSizes: [],
    imageSizes: [112, 224, 384, 768, 672, 1344, 960, 1920, 1024, 1376],
    qualities: [100],
  },

  // 2. OPTIONAL: Only uncomment the line below if your URL looks like:
  //    https://yourusername.github.io/YOUR-REPO-NAME/
  // basePath: '/YOUR-REPO-NAME', //
  // ----------------------------------

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: [{ loader: '@svgr/webpack', options: { icon: true } }],
        as: '*.js',
      },
    },
  },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
