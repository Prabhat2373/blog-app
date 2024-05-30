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
}) => {
  return (
    <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden flex">
      <div className={`p-4 flex flex-col w-full`}>
        <div className="flex items-center space-x-4 justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{author?.name}</p>
              <p className="text-gray-600">{datePosted}</p>
            </div>
            <button
              onClick={onFollow}
              className="ml-auto bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
            >
              Follow
            </button>
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
        </div>
        {thumbnailUrl && (
          <div className="w-full flex-shrink-0 rounded-md my-4">
            <img
              className="object-cover h-[200px] w-full rounded-md"
              src={thumbnailUrl}
              alt="Blog thumbnail"
              //   width={1920}
              height={200}
            />
          </div>
        )}
        <div className="mt-2">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-gray-600">
            {description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus, consequatur, similique quam ipsa accusamus autem iure
            eveniet nobis non id hic veniam ipsum aut sunt amet temporibus ullam
            consectetur aperiam!
          </p>
        </div>
        <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
          <span>{readMinutes || 10} min read</span>
          <div className="flex flex-wrap space-x-2">
            {tags?.length
              ? tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))
              : null}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={onSave}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            {isSaved ? (
              <BookmarkCheck className="text-blue-500" />
            ) : (
              <Bookmark />
            )}
            <span className="ml-1">{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
