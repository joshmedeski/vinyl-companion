const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["img.discogs.com", "localhost"],
  },
  pwa: {
    dest: "public",
  },
});
