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
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
