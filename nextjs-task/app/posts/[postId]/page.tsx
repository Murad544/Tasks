import { fetchPost } from '@/api';
import PostDetailsPage from '@/components/PostDetailsPage';
import PostNotFound from '@/components/PostNotFound';

interface Props {
  params: {
    postId: string;
  };
  searchParams: {};
}

const page = async ({ params, searchParams }: Props) => {
  const postId = Number(params.postId);
  try {
    const data = await fetchPost(postId);
    return <PostDetailsPage post={data} />;
  } catch (error) {
    return <PostNotFound />;
  }
};

export default page;
