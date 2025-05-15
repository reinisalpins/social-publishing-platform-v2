import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {switchMap} from 'rxjs';

interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiService = inject(ApiService);

  login(credentials: LoginCredentials) {
    return this.apiService.get<void>('/sanctum/csrf-cookie').pipe(
      switchMap(() => this.apiService.post<void>('/api/login', credentials))
    )
  }
}
