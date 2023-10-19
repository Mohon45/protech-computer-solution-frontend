module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://pro-tech-computer.vercel.app/api/v1/:path*",
      },
    ];
  },
  images: {
    domains: ["i.ibb.co"],
  },
};
