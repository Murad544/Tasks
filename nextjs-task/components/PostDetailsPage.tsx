import { Post } from '@/types/apiResponseTypes';

interface Props {
  post: Post;
}
const PostDetailsPage = ({ post }: Props) => {
  return (
    <div className='p-4 bg-white rounded shadow-md'>
      <h2 className='text-2xl font-bold mb-2'>{post.title}</h2>
      <p className='text-gray-700'>{post.body}</p>
      <div className='mt-4'>
        <span className='text-sm text-gray-500'>Posted by: {post.userId}</span>
      </div>
    </div>
  );
};

export default PostDetailsPage;
