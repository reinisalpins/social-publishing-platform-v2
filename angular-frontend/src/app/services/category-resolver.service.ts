import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot} from '@angular/router';
import {CategoryService} from './category.service';
import {catchError, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<any> {
  readonly categoryService = inject(CategoryService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<any> {
    return this.categoryService.getCategories().pipe(
      catchError(error => {
        return of(null);
      })
    );
  }
}
