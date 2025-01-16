module.exports = {
  env: {
    DEFAULT_PROFILE_PICTURE:
      "http://localhost:8000/api/uploads/default-profile.png",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/api/uploads/*", // This restricts the pattern to the profile picture endpoint
      },
    ],
  },
};
