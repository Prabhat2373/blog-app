import AuthorProfileContainer from '@/containers/author/AuthorProfileContainer';
import { cookies } from 'next/headers';
import React from 'react';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }) {
  const id = params?.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/author/profile/${id}`, {
    next: { revalidate: 60, tags: ['collection'] },
    headers: {
      authorization: `Bearer ${cookies().get('token')?.value}`
    }
  });

  const data = await res?.json();
  console.log('authorres', data);

  return <AuthorProfileContainer data={data} />;
}
