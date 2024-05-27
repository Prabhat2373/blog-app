"use client";
import PostListingCard from "@/component/cards/posts/PostListingCard";
import Container from "@/component/ui/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllPostsQuery } from "@/services/rtk/postsApi";
import Link from "next/link";
import React from "react";

const MainPostsContainer = () => {
  const { data } = useGetAllPostsQuery("");
  console.log("data", data);

  return (
    <>
      <Container>
        <Tabs defaultValue="account" className="">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <Link href={"/posts/create"}>Create Post</Link>

            <TabsTrigger value="account">For You</TabsTrigger>
            <TabsTrigger value="password">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
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
          </TabsContent>
          <TabsContent value="password">
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
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
};

export default MainPostsContainer;
