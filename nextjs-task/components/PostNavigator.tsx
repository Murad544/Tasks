'use client';

import { useParams, useRouter } from 'next/navigation';

const PostNavigator = () => {
  const router = useRouter();
  const searchParams = useParams();
  const postId = searchParams.postId;

  const navigateToPrevPost = () => {
    const prevPostId = Number(postId) - 1;
    router.push(`/posts/${prevPostId}`);
  };

  const navigateToNextPost = () => {
    const nextPostId = Number(postId) + 1;
    router.push(`/posts/${nextPostId}`);
  };
  return (
    <div className='flex justify-between items-center bg-gray-200 p-4 rounded-md'>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
        onClick={navigateToPrevPost}
        disabled={Number(postId) === 1}
      >
        Previous Post
      </button>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
        onClick={navigateToNextPost}
      >
        Next Post
      </button>
    </div>
  );
};

export default PostNavigator;
