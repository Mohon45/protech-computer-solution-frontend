import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (newUserData) => ({
        url: "/user/signup",
        method: "POST",
        data: newUserData,
      }),
      invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query: (loginData) => ({
        url: "/user/login",
        method: "POST",
        data: loginData,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    userProfileUpdate: build.mutation({
      query: (data) => ({
        url: `/user/profile-update/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["User"],
    }),
    getLoginUser: build.query({
      query: () => ({
        url: "/user/getLoggedInUser",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllAdmins: build.query({
      query: () => ({
        url: "/supar-admin",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUser: build.query({
      query: () => ({
        url: "/user/all-user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserProfileUpdateMutation,
  useGetLoginUserQuery,
  useGetAllAdminsQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
} = authApi;
