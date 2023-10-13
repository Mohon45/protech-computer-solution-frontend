import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../helper/axiosBaseQuery";
import { tagTypesList } from "../tag";

export const baseApi = createApi({
  reducerPath: "api",
  //   baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
