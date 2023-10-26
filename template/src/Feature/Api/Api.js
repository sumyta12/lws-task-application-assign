import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:9000`,
  }),
  endpoints: (builder) => ({}),
});

export default Api