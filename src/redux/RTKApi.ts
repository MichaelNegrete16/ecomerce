import { createApi } from "@reduxjs/toolkit/query/react";
import { values } from "ramda";

import { baseQuery } from "./baseQuery";

export const RTKTags = {};

export const RTKTagsAsArray = () => values(RTKTags);

export const api = createApi({
  reducerPath: "api",
  tagTypes: RTKTagsAsArray(),
  baseQuery,
  keepUnusedDataFor: 60,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
