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
import { ScrollArea } from "@/components/ui/scroll-area";

import { useGetAllPostsQuery } from "@/services/rtk/postsApi";
import Link from "next/link";
import React from "react";
import HomeAsideContainer from "./aside/HomeAsideContainer";
import EmptyState from "@/component/app/EmptyState";

const MainPostsContainer = () => {
  const { data } = useGetAllPostsQuery("");
  console.log("data", data);

  return (
    <>
      <div className="grid grid-cols-10 gap-4">
        <ScrollArea className="h-screen col-span-10 md:col-span-7">
          <Container>
            <Tabs active="account" className="">
              <TabLinks className="grid grid-cols-2 w-[400px]">
                <TabLink target="account">For You</TabLink>
                <TabLink target="password">Following</TabLink>
              </TabLinks>

              <TabContent>
                <TabPane id="account">
                  <div className="grid grid-cols-1 gap-4">
                    <EmptyState data={data?.data} title="No Posts To Display!">
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
                    </EmptyState>
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
          </Container>
        </ScrollArea>
        <div className="hidden md:block md:col-span-3">
          <HomeAsideContainer />
        </div>
      </div>
    </>
  );
};

export default MainPostsContainer;
