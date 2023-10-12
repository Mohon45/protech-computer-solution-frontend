import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../helper/axiosBaseQuery";
import { tagTypesList } from "../tag";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
