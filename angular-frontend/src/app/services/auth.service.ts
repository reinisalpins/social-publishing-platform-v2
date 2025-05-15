import {computed, inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {switchMap} from 'rxjs';
import {UserService} from './user.service';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiService = inject(ApiService);
  readonly userService = inject(UserService);
  readonly isLoggedIn = computed(() => this.userService.user() !== null);

  login(credentials: LoginCredentials) {
    return this.apiService.get<void>('/sanctum/csrf-cookie').pipe(
      switchMap(() => this.apiService.post<void>('/api/login', credentials))
    )
  }

  register(credentials: RegisterCredentials) {
    return this.apiService.get<void>('/sanctum/csrf-cookie').pipe(
      switchMap(() => this.apiService.post<void>('/api/register', credentials))
    )
  }
}
