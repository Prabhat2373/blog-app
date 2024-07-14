import CollectionsIndexContainer from '@/containers/collections/CollectionsIndexContainer';
import React from 'react';
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

const CollectionsIndex = async () => {
  return <CollectionsIndexContainer />;
};

export default CollectionsIndex;
