import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (data) => ({
        url: "/booking/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Bookings"],
    }),

    getUserBookings: build.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),

    userUpdateBooking: build.mutation({
      query: (id) => ({
        url: `/booking/user-update/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useUserUpdateBookingMutation,
} = bookingApi;
