import {Component, inject, OnInit, signal} from '@angular/core';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {Post} from '../../models/post';
import {ToastService, Variant} from '../../services/toast.service';
import {LoaderComponent} from '../../components/loader/loader.component';
import {PostCardComponent} from '../../components/posts/post-card/post-card.component';

@Component({
  selector: 'app-search',
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    LoaderComponent,
    PostCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  readonly searchTerm = signal<string>('');
  readonly currentSearchQuery = signal<string>('');
  readonly posts = signal<Post[]>([]);
  readonly isLoading = signal(false);

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly postService = inject(PostService);
  readonly toastService = inject(ToastService);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['query'] || '';
      this.searchTerm.set(query);

      if (query) {
        this.currentSearchQuery.set(query);
        this.performSearch(query);
      } else {
        this.posts.set([]);
        this.currentSearchQuery.set('');
      }
    });
  }

  updateSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  search() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {query: this.searchTerm()},
      queryParamsHandling: 'merge'
    });
  }

  performSearch(query: string) {
    this.isLoading.set(true);
    this.posts.set([]);

    this.postService.searchPosts(query).pipe(
      tap((posts) => this.posts.set(posts)),
      catchError(error => {
        this.toastService.showToast('Something went wrong', 3000, Variant.ERROR);

        return throwError(() => error)
      }),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }
}
