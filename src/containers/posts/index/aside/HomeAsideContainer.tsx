import FeaturedListCard from '@/components/cards/posts/featured/FeaturedListCard';
import { useGetAllPostsQuery } from '@/services/rtk/postsApi';
import React from 'react';

const HomeAsideContainer = () => {
  const { data } = useGetAllPostsQuery('');
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight">Featured</h3>
      {data?.data?.map((post) => {
        return <FeaturedListCard data={post} />;
      })}
    </div>
  );
};

export default HomeAsideContainer;
