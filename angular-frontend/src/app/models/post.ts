import {User} from './user';
import {Category} from './category';

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  comments?: PostComment[];
  commentsCount?: number;
  categories?: Category[];
  createdAt: string;
  user?: User;
}

export interface PostComment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  user: User;
  createdAt: string;
}
