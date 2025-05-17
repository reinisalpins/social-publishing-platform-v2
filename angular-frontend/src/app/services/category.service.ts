import {inject, Injectable, signal} from '@angular/core';
import {ApiService} from './api.service';
import {Category} from '../models/category';
import {ApiResponse} from '../models/api';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly apiService = inject(ApiService);

  readonly categories = signal<Category[]>([]);

  getCategories() {
    return this.apiService.get<ApiResponse<Category[]>>('/api/categories').pipe(
      map(response => response.data),
      tap(categories => this.categories.set(categories))
    );
  }

  getCategoryBySlug(slug: string) {
    return this.apiService.get<ApiResponse<Category>>(`/api/categories/${slug}`).pipe(
      map(response => response.data),
    );
  }
}
