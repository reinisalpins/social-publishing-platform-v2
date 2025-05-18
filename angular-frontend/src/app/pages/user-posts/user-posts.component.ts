import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {catchError, finalize, Subscription, switchMap, tap, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {ToastService, Variant} from '../../services/toast.service';
import {LoaderComponent} from '../../components/loader/loader.component';
import {PostCardComponent} from '../../components/posts/post-card/post-card.component';

@Component({
  selector: 'app-user-posts',
  imports: [
    LoaderComponent,
    PostCardComponent
  ],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit, OnDestroy {
  readonly route = inject(ActivatedRoute);
  readonly postService = inject(PostService);
  readonly userService = inject(UserService);
  readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly user = signal<User | null>(null);
  readonly posts = signal<Post[]>([]);

  private routeSubscription: Subscription | null = null;

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.getUserPosts(userId);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  getUserPosts(userId: string | number) {
    this.isLoading.set(true);

    this.userService.getUserById(userId).pipe(
        tap((user) => this.user.set(user)),
        switchMap((user) => this.postService.getPostsByUser(user.id)),
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
