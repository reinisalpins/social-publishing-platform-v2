import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ApiResponse} from '../models/api';
import {Post} from '../models/post';
import {map} from 'rxjs';

interface CreatePostPayload {
  title: string;
  content: string;
  categories: string[]
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly apiService = inject(ApiService);

  createPost(payload: CreatePostPayload) {
    return this.apiService.post<void>('/api/posts', payload);
  }

  updatePost(postId: number, payload: CreatePostPayload) {
    return this.apiService.patch<void>(`/api/posts/${postId}`, payload);
  }

  getAuthUserPosts() {
    return this.apiService.get<ApiResponse<Post[]>>('/api/user/posts').pipe(
      map(response => response.data),
    );
  }

  getPostById(id: number | string) {
    return this.apiService.get<ApiResponse<Post>>(`/api/posts/${id}`).pipe(
      map(response => response.data),
    );
  }

  getAuthUserPostById(id: number | string) {
    return this.apiService.get<ApiResponse<Post>>(`/api/user/posts/${id}`).pipe(
      map(response => response.data),
    );
  }

  deletePost(id: number | string) {
    return this.apiService.delete<void>(`/api/posts/${id}`);
  }

  getAllPosts() {
    return this.apiService.get<ApiResponse<Post[]>>('/api/posts').pipe(
      map(response => response.data),
    );
  }

  createComment(postId: number, content: string) {
    return this.apiService.post<void>(`/api/posts/${postId}/comments`, {content});
  }

  deleteComment(commentId: number) {
    return this.apiService.delete<void>(`/api/comments/${commentId}`);
  }

  getPostsByCategory(categoryId: number) {
    return this.apiService.get<ApiResponse<Post[]>>(`/api/categories/${categoryId}/posts`).pipe(
      map(response => response.data),
    );
  }

  getPostsByUser(userId: number) {
    return this.apiService.get<ApiResponse<Post[]>>(`/api/users/${userId}/posts`).pipe(
      map(response => response.data),
    );
  }
}
