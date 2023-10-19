import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addNewCartItem: build.mutation({
      query: (data) => ({
        url: "/cart/update",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Carts"],
    }),

    getUserCartItem: build.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Carts"],
    }),

    removeCartItem: build.mutation({
      query: (data) => ({
        url: "/cart/remove",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useAddNewCartItemMutation,
  useGetUserCartItemQuery,
  useRemoveCartItemMutation,
} = cartApi;
