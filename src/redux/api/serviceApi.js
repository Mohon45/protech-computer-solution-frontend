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
      providesTags: ["Services"],
    }),
    getServiceDetails: build.query({
      query: (id) => ({
        url: `/service/details/${id}`,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    updateService: build.mutation({
      query: (data) => ({
        url: `/service/update/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `/service/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
    userReviewService: build.mutation({
      query: (data) => ({
        url: `/service/review/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetServicesQuery,
  useGetServiceDetailsQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUserReviewServiceMutation,
} = serviceApi;
