import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Force Next.js to output static files instead of a server build
  output: 'export',

  // 2. GitHub Pages doesn't support built-in image optimization
  images: {
    unoptimized: true,
  },

  // 3. Optional: Only add this if your site URL looks like
  //    https://yourusername.github.io/YOUR-REPO-NAME/
  // basePath: '/YOUR-REPO-NAME',
};

export default nextConfig;
