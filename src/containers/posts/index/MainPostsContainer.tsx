"use client";
import PostListingCard from "@/component/cards/posts/PostListingCard";
import Container from "@/component/ui/Container";
import { useGetAllPostsQuery } from "@/services/rtk/postsApi";
import Link from "next/link";
import React from "react";

const MainPostsContainer = () => {
  const { data } = useGetAllPostsQuery("");
  console.log("data", data);

  return (
    <>
      ALl Posts
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {data?.data?.map((blog) => {
            return (
              <>
                {/* <Link href={`/posts/${blog?._id}`}>{blog?.title}</Link> */}
                <PostListingCard data={blog} />
              </>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default MainPostsContainer;
