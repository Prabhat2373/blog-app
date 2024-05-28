"use client";
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
      <Container>
        <Tabs active="account" className="">
          <TabLinks className="grid grid-cols-2 w-[400px]">
            <TabLink target="account">For You</TabLink>
            <TabLink target="password">Following</TabLink>
          </TabLinks>

          <TabContent>
            <TabPane id="account">
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
            </TabPane>
            <TabPane id="password">
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
            </TabPane>
          </TabContent>
        </Tabs>
      </Container>
    </>
  );
};

export default MainPostsContainer;
