import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:3000/";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Carros"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
})