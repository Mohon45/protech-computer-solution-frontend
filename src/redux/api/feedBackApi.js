import { baseApi } from "./baseApi";

export const feedBackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitFeedback: build.mutation({
      query: (data) => ({
        url: "/feedback/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Feedbacks"],
    }),

    getAllFeedbacks: build.query({
      query: () => ({
        url: "/feedback",
        method: "GET",
      }),
      providesTags: ["Feedbacks"],
    }),
  }),
});

export const { useSubmitFeedbackMutation, useGetAllFeedbacksQuery } =
  feedBackApi;
