import {inject, Injectable, signal} from '@angular/core';
import {ApiService} from './api.service';
import {User} from '../models/user';
import {ApiResponse} from '../models/api';
import {map, tap} from 'rxjs';

interface UpdateUserPayload {
  name: string;
  email: string;
}

interface UpdatePasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiService = inject(ApiService);
  readonly user = signal<User | null>(null);

  getCurrentUser() {
    return this.apiService.get<ApiResponse<User>>('/api/user').pipe(
      map(response => response.data),
      tap(userData => this.user.set(userData))
    );
  }

  updateUser(payload: UpdateUserPayload) {
    return this.apiService.patch<ApiResponse<User>>('/api/user', payload).pipe(
      map(response => response.data),
      tap(userData => this.user.set(userData))
    );
  }

  updatePassword(payload: UpdatePasswordPayload) {
    return this.apiService.patch<void>('/api/user/password', payload);
  }

  clearUser() {
    this.user.set(null);
  }

  getUserById(id: number | string) {
    return this.apiService.get<ApiResponse<User>>(`/api/users/${id}`).pipe(
      map(response => response.data),
    );
  }
}
