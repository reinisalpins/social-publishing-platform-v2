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
}

export interface PostComment {
  id: number;
  content: string;
  user: User;
}
