import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createService: build.mutation({
      query: (data) => ({
        url: "/service/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Services"],
    }),

    getServices: build.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
    }),
    getServiceDetails: build.query({
      query: (id) => ({
        url: `/service/details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetServicesQuery,
  useGetServiceDetailsQuery,
} = serviceApi;
