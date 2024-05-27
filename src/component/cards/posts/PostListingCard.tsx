// import { Badge } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const PostListingCard = () => {
  return (
    <div className="w-[400px] flex flex-col justify-center gap-5">
      <img
        src="https://images.unsplash.com/photo-1716681864605-e3ac39e9aea4?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={400}
        className="rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-purple-500 font-semibold">
            Olivia Rhye • 20 Jan 2024
          </p>
        </div>
        <Link
          href="/posts/:id"
          className="flex justify-between hover:border-black border-b border-transparent"
        >
          <h1 className="font-semibold text-2xl ">UX Preview Presentation</h1>
          <IconArrowUpRight />
        </Link>
        <div>
          <p className="text-gray-500">
            Extend default theme with any amount of additional colors, replace
            shadows, radius, spacing, fonts and many o
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Badge color="blue" variant={"outline"}>
            Primary
          </Badge>
          <Badge color="orange">Orange</Badge>
          <Badge color="purple">Purple</Badge>
        </div>
      </div>
    </div>
  );
};

export default PostListingCard;