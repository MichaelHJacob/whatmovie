/** @type {import('next').NextConfig} */

const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
                  options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "removeAttrs",
                    params: { attrs: "(fill|stroke)" },
                  },
                ],
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/movie/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
