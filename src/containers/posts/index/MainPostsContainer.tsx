'use client';
import Container from '@/components/ui/Container';
import { ScrollArea } from '@/components/ui/scroll-area';

import TabContentSection from '@/components/posts/feed/FeedPostTabSection';
import { usePosts } from '@/hooks/posts/use-feed-posts';
import { useState } from 'react';
import HomeAsideContainer from './aside/HomeAsideContainer';

const MainPostsContainer = () => {
  const [options, setOptions] = useState({});
  const { data, followingPosts } = usePosts(options);
  return (
    <>
      <div className="grid grid-cols-10 gap-4">
        <ScrollArea className="h-screen col-span-10 md:col-span-7">
          <Container>
            <TabContentSection
              options={options}
              setOptions={setOptions}
              data={data}
              followingPosts={followingPosts}
            />
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
