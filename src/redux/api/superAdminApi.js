import { baseApi } from "./baseApi";

export const superAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/supar-admin/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
    // getAllAdmins: build.query({
    //   query: () => ({
    //     url: "/supar-admin",
    //     method: "GET",
    //   }),
    //   providesTags: ["User"],
    // }),

    makeAdmin: build.mutation({
      query: (data) => ({
        url: `/supar-admin/make-admin/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/supar-admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useMakeAdminMutation,
  useDeleteAdminMutation,
} = superAdminApi;
