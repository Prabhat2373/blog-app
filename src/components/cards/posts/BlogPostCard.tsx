import React from 'react';
import Image from 'next/image';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar';
import { Bookmark, BookmarkCheck, Ellipsis, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { extractFirstParagraph, getRandomColor } from '@/utils/utils';
import Link from 'next/link';
import { IconBookmarkFilled, IconBookmarkPlus } from '@tabler/icons-react';
import WithTooltip from '@/components/ui/WithTooltip';
import { countWords, estimateReadingTime, extractText } from '@/helpers/app/text.processor';
import { formatDateTime } from '@/helpers/date.helpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/store';
import FollowButtonLink from './utils/FollowButtonLink';
import SavePostLink from './utils/SavePostLink';

interface BlogPostCardProps {
  thumbnailUrl?: string;
  authorAvatarUrl: string;
  authorName: string;
  datePosted: string;
  title: string;
  description: string;
  tags: string[];
  readMinutes: number;
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

  onFollow,
  onSave,
  onMenuSelect,
  author,
  ...data
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const desc = extractFirstParagraph(data?.content?.content);
  console.log('desc', desc);

  const extractedText = extractText(data?.content?.content);

  const wordCount = countWords(extractedText);
  const readingTime = estimateReadingTime(wordCount);
  console.log('readingTime', readingTime);

  return (
    <div className="col-span-1 border-b overflow-hidden">
      <div className={`p-4 flex flex-col w-full`}>
        <div className="flex items-center space-x-4 justify-between pb-2">
          <div className="flex items-start space-x-4">
            <Link href={`/authors/profile/${author?._id}`} className="flex items-start space-x-4">
              <Avatar className="cursor-pointer">
                <AvatarImage src={author?.avatar} alt={author?.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-sm flex flex-col">
                <div className="flex gap-2 items-center">
                  <p className="text-gray-900 leading-none">@{author?.name}</p>

                  <FollowButtonLink author={author} />
                </div>
                <div className="flex gap-2 items-center text-gray-600">
                  <p className="text-gray-600 text-xs mt-1">{formatDateTime(data?.createdAt)}</p>•
                  <p className="text-gray-600 text-xs mt-1">{readingTime} Min Read</p>
                </div>
              </div>
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <MoreHorizontal className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/posts/edit/${data?._id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        {/* <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
          <span>{readingTime} min read</span>
        </div> */}
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
          <SavePostLink />
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
