import { BLOG_POST_MODES } from '@/config/app/AppConstants';
import CreateBlogPostFormContainer from '@/containers/posts/create/BlogPostFormContainer';
import React from 'react';

export default async function EditBlogPostIndex({ params }) {
  console.log('params', params);
  const postId = params?.id;
  console.log('postId', postId);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${postId}`, {
    next: { revalidate: 60, tags: ['collection'] }
  });
  const post = await res.json();

  return <CreateBlogPostFormContainer mode={BLOG_POST_MODES.EDIT} post={post?.data} />;
}

// export default EditBlogPostIndex;
