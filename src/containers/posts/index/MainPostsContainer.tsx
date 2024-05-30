"use client";
import BlogPostCard from "@/component/cards/posts/BlogPostCard";
import PostListingCard from "@/component/cards/posts/PostListingCard";
import Container from "@/component/ui/Container";
import Tabs, {
  TabContent,
  TabLink,
  TabLinks,
  TabPane,
} from "@/component/ui/Tabs";

import { useGetAllPostsQuery } from "@/services/rtk/postsApi";
import Link from "next/link";
import React from "react";

const MainPostsContainer = () => {
  const { data } = useGetAllPostsQuery("");
  console.log("data", data);

  return (
    <>
      <Tabs active="account" className="">
        <TabLinks className="grid grid-cols-2 w-[400px]">
          <TabLink target="account">For You</TabLink>
          <TabLink target="password">Following</TabLink>
        </TabLinks>

        <TabContent>
          <TabPane id="account">
            <div className="grid grid-cols-1 gap-4">
              {data?.data?.map((blog, index) => {
                return (
                  <>
                    {/* <Link href={`/posts/${blog?._id}`}>{blog?.title}</Link> */}
                    {/* <PostListingCard data={blog} /> */}
                    <BlogPostCard
                      {...blog}
                      title={blog?.title}
                      thumbnailUrl={
                        index % 2 !== 0
                          ? "https://images.unsplash.com/photo-1716386480038-1e375da14e1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          : undefined
                      }
                    />
                  </>
                );
              })}
            </div>
          </TabPane>
          <TabPane id="password">
            <div className="grid grid-cols-3 gap-4">
              {data?.data?.map((blog) => {
                return (
                  <div>
                    {/* <Link href={`/posts/${blog?._id}`}>{blog?.title}</Link> */}
                    <PostListingCard data={blog} />
                  </div>
                );
              })}
            </div>
          </TabPane>
        </TabContent>
      </Tabs>
    </>
  );
};

export default MainPostsContainer;
