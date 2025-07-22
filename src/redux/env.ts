console.log(process.env.ECOMERCE_API_URL, "process.env.ECOMERCE_API_URL");

export default {
  ECOMERCE_TOKEN: process.env.ECOMERCE_TOKEN || "",
  ECOMERCE_API_URL: process.env.ECOMERCE_API_URL || "",
};
