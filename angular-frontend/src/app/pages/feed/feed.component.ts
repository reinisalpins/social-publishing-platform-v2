import {Component, inject, OnInit, signal} from '@angular/core';
import {PostCardComponent} from '../../components/posts/post-card/post-card.component';
import {Post} from '../../models/post';
import {LoaderComponent} from '../../components/loader/loader.component';
import {PostService} from '../../services/post.service';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {ToastService, Variant} from '../../services/toast.service';

@Component({
  selector: 'app-feed',
  imports: [
    PostCardComponent,
    LoaderComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  readonly posts = signal<Post[]>([]);
  readonly isLoading = signal(false);

  readonly toastService = inject(ToastService);
  readonly postService = inject(PostService);

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.isLoading.set(true);

    this.postService.getAllPosts().pipe(
      tap((posts) => this.posts.set(posts)),
      finalize(() => this.isLoading.set(false)),
      catchError((error) => {
        this.toastService.showToast('Something went wrong while loading posts', 3000, Variant.ERROR);
        
        return throwError(() => error);
      })
    ).subscribe()
  }
}
