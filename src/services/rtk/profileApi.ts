import { baseQuery } from "@/utils/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
      }),
    }),
    getAuthorProfile: builder.query({
      query: (id) => ({
        url: `/author/profile/${id}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetProfileQuery,
  useGetProfileQuery,
  useLazyGetAuthorProfileQuery
} = profileApi;
