import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

interface ApiOptions {
  params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000';

  get<T>(endpoint: string, options?: ApiOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      withCredentials: true,
      ...options
    });
  }

  post<T>(endpoint: string, data: any, options?: ApiOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, {
      withCredentials: true,
      ...options
    });
  }

  patch<T>(endpoint: string, data: any, options?: ApiOptions): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data, {
      withCredentials: true,
      ...options
    });
  }

  delete<T>(endpoint: string, options?: ApiOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      withCredentials: true,
      ...options
    });
  }
}
