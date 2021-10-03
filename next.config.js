const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const settings = {
  reactStrictMode: true,
  images: {
    domains: ["img.discogs.com", "localhost"],
  },
  pwa: {
    dest: "public",
  },
};

module.exports =
  process.env.NODE_ENV === "development" ? settings : withPWA(settings);
