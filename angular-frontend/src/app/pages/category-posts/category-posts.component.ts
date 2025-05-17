import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../components/loader/loader.component';
import {Post} from '../../models/post';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, finalize, Subscription, switchMap, tap, throwError} from 'rxjs';
import {ToastService, Variant} from '../../services/toast.service';
import {PostService} from '../../services/post.service';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {PostCardComponent} from '../../components/posts/post-card/post-card.component';

@Component({
  selector: 'app-category-posts',
  imports: [
    LoaderComponent,
    PostCardComponent
  ],
  templateUrl: './category-posts.component.html',
  styleUrl: './category-posts.component.css'
})
export class CategoryPostsComponent implements OnInit, OnDestroy {
  readonly posts = signal<Post[]>([]);
  readonly isLoading = signal(false);
  readonly category = signal<Category | null>(null);

  readonly route = inject(ActivatedRoute);
  readonly postService = inject(PostService);
  readonly toastService = inject(ToastService);
  readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);

  private routeSubscription: Subscription | null = null;

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') || '';
      this.getCategoryPosts(slug);
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  getCategoryPosts(categorySlug: string) {
    this.isLoading.set(true);

    this.categoryService.getCategoryBySlug(categorySlug).pipe(
      tap((category) => this.category.set(category)),
      switchMap((category) => this.postService.getPostsByCategory(category.id)),
      tap((posts) => this.posts.set(posts)),
      catchError((error) => {
        if (error.status === 404) {
          this.router.navigate(['/not-found']);

          return throwError(() => error)
        }
        this.toastService.showToast('Something went wrong while loading posts', 3000, Variant.ERROR);

        return throwError(() => error);
      }),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }
}
