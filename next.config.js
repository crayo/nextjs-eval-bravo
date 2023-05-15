/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        "source": "/",
        "destination": "/posts"
      }
    ];
  }
};

module.exports = nextConfig;
