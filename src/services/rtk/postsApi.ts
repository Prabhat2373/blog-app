import { baseQuery } from "@/utils/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (body) => ({
        url: "/blogs",
        method: "POST",
        body,
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: `/blogs`,
      }),
    }),
    getPostOverview: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
      }),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/blogs/like/${id}`,
        method: "POST",
      }),
    }),
    commentOnPost: builder.mutation({
      query: (id) => ({
        url: `/blogs/comment/${id}`,
        method: "POST",
      }),
    }),
    sharePost: builder.mutation({
      query: (id) => ({
        url: `/blogs/share/${id}`,
        method: "POST",
      }),
    }),
    saveDrafts: builder.mutation({
      query: (body) => ({
        url: `/posts/drafts`,
        method: "POST",
        body,
      }),
    }),
    getSavedDrafts: builder.query({
      query: () => ({
        url: `/posts/drafts`,
      }),
    }),
  }),
});

export const {
  useCommentOnPostMutation,
  useCreatePostMutation,
  useLazyGetPostOverviewQuery,
  useLikePostMutation,
  useSharePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useSaveDraftsMutation,
  useLazyGetSavedDraftsQuery,
  useGetSavedDraftsQuery,
} = postsApi;
