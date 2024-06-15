import WithTooltip from '@/components/ui/WithTooltip';
import { RootState } from '@/services/store';
import { Post } from '@/types/posts/posts.types';
import { IconBookmarkFilled, IconBookmarkPlus } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface ISavePostLink {
  post: Post;
}

const SavePostLink = ({ post }: ISavePostLink) => {
  const { user } = useSelector((state: RootState) => state.user);

  const [isSaved, setIsSaved] = useState(false);

  const toggleSavePost = () => {};
  return (
    <WithTooltip description={'Save To Reading List'}>
      <button
        onClick={toggleSavePost}
        className="flex items-center text-gray-500 hover:text-gray-700"
      >
        {isSaved ? <IconBookmarkFilled className="text-blue-500" /> : <IconBookmarkPlus />}
        {/* <span className="ml-1">{isSaved ? "Saved" : "Save"}</span> */}
      </button>
    </WithTooltip>
  );
};

export default SavePostLink;
