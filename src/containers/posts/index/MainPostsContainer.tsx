"use client";
import { useGetAllPostsQuery } from "@/services/rtk/postsApi";
import Link from "next/link";
import React from "react";

const MainPostsContainer = () => {
  const { data } = useGetAllPostsQuery("");
  console.log("data", data);

  return (
    <>
      ALl Posts
      <div>
        {data?.data?.map((blog) => {
          return (
            <>
              <Link href={`/posts/${blog?._id}`}>{blog?.title}</Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MainPostsContainer;
