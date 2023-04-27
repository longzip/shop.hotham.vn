const path = require("path");
const allowedImageWordPressDomain = new URL(
  process.env.NEXT_PUBLIC_WORDPRESS_URL
).hostname;

module.exports = {
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  /**
   * We specify which domains are allowed to be optimized.
   * This is needed to ensure that external urls can't be abused.
   * @see https://nextjs.org/docs/basic-features/image-optimization#domains
   */
  images: {
    domains: [
      allowedImageWordPressDomain,
      "via.placeholder.com",
      "i0.wp.com",
      "i2.wp.com",
      "i1.wp.com",
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-sitemap");
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/san-pham/:path*",
        destination: "/cua-hang/:path*",
        permanent: true,
      },
      {
        source: "/shop/:path*",
        destination: "/cua-hang/:path*",
        permanent: true,
      },
      // {
      //   source: "/danh-muc-san-pham/:path*",
      //   destination: "/:path*",
      //   permanent: true,
      // },
      {
        source: "/blog/:slug*",
        destination: `https://${allowedImageWordPressDomain}/blog/:slug*`,
        permanent: true,
      },
    ];
  },
};
