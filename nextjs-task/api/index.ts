import ky from 'ky';
import { Post } from '@/types/apiResponseTypes';

export const baseUrl = 'https://jsonplaceholder.typicode.com';

export const fetchPost = async (postId: number): Promise<Post> => {
  try {
    const post = await ky.get(`${baseUrl}/posts/${postId}`).json<Post>();
    return post;
  } catch (error) {
    throw new Error(error as string);
  }
};
