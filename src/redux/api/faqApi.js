import { baseApi } from "./baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFaq: build.mutation({
      query: (data) => ({
        url: "/faq/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Faqs"],
    }),

    getAllFaq: build.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: ["Faqs"],
    }),
    getFaqDetails: build.query({
      query: (id) => ({
        url: `/faq/details/${id}`,
        method: "GET",
      }),
      providesTags: ["Faqs"],
    }),
    updateFaq: build.mutation({
      query: (data) => ({
        url: `/faq/update/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["Faqs"],
    }),

    deleteFaq: build.mutation({
      query: (id) => ({
        url: `/faq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faqs"],
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetAllFaqQuery,
  useGetFaqDetailsQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
