'use server';
import AuthorsListContainer from '@/containers/author/AuthorsListContainer';
import React from 'react';

const AuthorsIndex = async () => {
  return <AuthorsListContainer />;
};

export default AuthorsIndex;
