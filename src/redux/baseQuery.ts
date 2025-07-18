import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: "",
  mode: "cors",
  prepareHeaders: (headers) => {
    // Add any custom headers here if needed
    const token = process.env.ECOMERCE_TOKEN;

    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
