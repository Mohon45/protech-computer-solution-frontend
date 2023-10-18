import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (data) => ({
        url: "/blog/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Blogs"],
    }),

    getAllBlogs: build.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    getSingleBlog: build.query({
      query: (id) => ({
        url: `/blog/details/${id}`,
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    updateBlog: build.mutation({
      query: (data) => ({
        url: `/blog/update/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
