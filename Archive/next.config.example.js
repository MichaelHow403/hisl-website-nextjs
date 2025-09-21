/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // { protocol: 'https', hostname: 'example-cdn.com' } // TODO: add if using remote images
    ]
  },
})