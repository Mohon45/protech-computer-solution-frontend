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
    getLoginUser: build.query({
      query: () => ({
        url: "/user/getLoggedInUser",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetLoginUserQuery,
} = authApi;
