import BlogPostOverviewContainer from '@/containers/posts/overview/BlogPostOverviewContainer';
import React from 'react';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function Page({ params }) {
  console.log('params', params);
  const postId = params?.id;
  console.log('postId', postId);
  // Call an external API endpoint to get posts

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${postId}`, {
    next: { revalidate: 60, tags: ['collection'] }
  });
  const post = await res.json();
  console.log('post', post);
  return <BlogPostOverviewContainer data={post?.data} />;
}

// export async function getStaticProps({ params }) {
//   const postId = params?.id;
//   // Call an external API endpoint to get posts

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${postId}`);
//   const post = await res.json();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       post
//     }
//   };
// }
