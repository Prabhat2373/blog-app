'use server';
import AuthorsListContainer from '@/containers/author/AuthorsListContainer';
import api from '@/services/ssr/api';

const AuthorsIndex = async () => {
  const res = await api.get('/authors/all');
  const data = res?.data?.data;
  return <AuthorsListContainer data={data} />;
};

export default AuthorsIndex;
