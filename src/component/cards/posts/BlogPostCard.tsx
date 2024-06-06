import React from "react";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Bookmark, BookmarkCheck, Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { extractFirstParagraph, getRandomColor } from "@/utils/utils";
import Link from "next/link";
import { IconBookmarkFilled, IconBookmarkPlus } from "@tabler/icons-react";
import WithTooltip from "@/component/ui/WithTooltip";
import {
  countWords,
  estimateReadingTime,
  extractText,
} from "@/helpers/app/text.processor";
import { formatDateTime } from "@/helpers/date.helpers";

interface BlogPostCardProps {
  thumbnailUrl?: string;
  authorAvatarUrl: string;
  authorName: string;
  datePosted: string;
  title: string;
  description: string;
  tags: string[];
  readMinutes: number;
  isSaved: boolean;
  onFollow: () => void;
  onSave: () => void;
  onMenuSelect: (option: string) => void;
  author?: any;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  thumbnailUrl,
  authorAvatarUrl,
  authorName,
  datePosted,
  title,
  description,
  tags,
  readMinutes,
  isSaved,
  onFollow,
  onSave,
  onMenuSelect,
  author,
  ...data
}) => {
  const desc = extractFirstParagraph(data?.content?.content);
  console.log("desc", desc);

  const extractedText = extractText(data?.content?.content);

  const wordCount = countWords(extractedText);
  const readingTime = estimateReadingTime(wordCount);
  console.log("readingTime", readingTime);
  return (
    // <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden flex">
    <div className="col-span-1 border-b overflow-hidden">
      <div className={`p-4 flex flex-col w-full`}>
        {/* <div className="flex items-center space-x-4 justify-between">
          <div className="flex items-start space-x-4">
            <Link
              href={`/author/profile/${author?._id}`}
              className="flex items-start space-x-4"
            >
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="text-gray-900 leading-none">@{author?.name}</p>
                <p className="text-gray-600 text-xs mt-1">
                  {datePosted || "17 nov 2024"}
                </p>
              </div>
            </Link>
            <Button
              variant={"link"}
              onClick={onFollow}
              // className="ml-auto bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
              className="m-0 p-0 h-4 text-primary"
            >
              Follow
            </Button>
          </div>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="border-none">
                <Ellipsis />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => onMenuSelect("edit")}>
                  Edit
                </MenubarItem>
                <MenubarItem onClick={() => onMenuSelect("delete")}>
                  Delete
                </MenubarItem>
                <MenubarItem onClick={() => onMenuSelect("report")}>
                  Report
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div> */}
        <div className="flex items-center space-x-4 justify-between pb-2">
          <div className="flex items-start space-x-4">
            <Link
              href={`/author/profile/${author?._id}`}
              className="flex items-start space-x-4"
            >
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-sm flex flex-col">
                <div className="flex gap-2 items-center">
                  <p className="text-gray-900 leading-none">@{author?.name}</p>
                  <Button
                    variant={"link"}
                    // onClick={onFollow}
                    // className="ml-auto bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                    className="m-0 p-0 h-4 text-primary"
                  >
                    Follow
                  </Button>
                </div>
                <div className="flex gap-2 items-center text-gray-600">
                  <p className="text-gray-600 text-xs mt-1">
                    {formatDateTime(data?.createdAt)}
                  </p>
                  •
                  <p className="text-gray-600 text-xs mt-1">
                    {readingTime} Min Read
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="border-none">
                <Ellipsis />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Edit</MenubarItem>
                <MenubarItem>Delete</MenubarItem>
                <MenubarItem>Report</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <Link href={`/posts/${data?._id}`}>
          {data?.thumbnail && (
            <div className="w-full flex-shrink-0 rounded-md my-4">
              <img
                className="object-cover h-[200px] w-full rounded-md"
                src={data?.thumbnail}
                alt="Blog thumbnail"
                //   width={1920}
                height={200}
              />
            </div>
          )}
          <div className="mt-2">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-gray-600">
              {/* {description} */}
              {desc}
            </p>
          </div>
        </Link>
        <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
          <span>{readingTime} min read</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap space-x-2">
            {tags?.length
              ? tags.map((tag) => (
                  <Badge key={tag} color={getRandomColor()}>
                    {tag}
                  </Badge>
                ))
              : null}
          </div>
          <WithTooltip description={"Save To Reading List"}>
            <button
              onClick={onSave}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              {isSaved ? (
                <IconBookmarkFilled className="text-blue-500" />
              ) : (
                <IconBookmarkPlus />
              )}
              {/* <span className="ml-1">{isSaved ? "Saved" : "Save"}</span> */}
            </button>
          </WithTooltip>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
