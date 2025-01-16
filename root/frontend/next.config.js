module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Optional: if your images are served from a specific port
        pathname: "/api/profile-picture/*", // This restricts the pattern to the profile picture endpoint
      },
    ],
  },
};
