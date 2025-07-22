module.exports = {
  apps: [
    {
      name: "ecomerce-front",
      script: "pnpm",
      env: {
        NODE_ENV: "production",
        ECOMERCE_API_URL: process.env.ECOMERCE_API_URL,
        ECOMERCE_TOKEN: process.env.ECOMERCE_TOKEN,
      },
    },
  ],
};
