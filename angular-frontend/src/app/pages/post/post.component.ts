import {Component, inject, OnInit, signal} from '@angular/core';
import {CommentCardComponent} from '../../components/posts/comment-card/comment-card.component';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {Post} from '../../models/post';
import {ToastService, Variant} from '../../services/toast.service';
import {LoaderComponent} from '../../components/loader/loader.component';
import {CreateCommentComponent} from '../../components/posts/create-comment/create-comment.component';

@Component({
  selector: 'app-post',
  imports: [
    CommentCardComponent,
    LoaderComponent,
    CreateCommentComponent,
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  readonly postService = inject(PostService);
  readonly toastService = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly post = signal<Post | null>(null);

  readonly postId = this.route.snapshot.paramMap.get('id') || '';

  ngOnInit() {
    this.getPost(this.postId);
  }

  getPost(id: string, showLoader: boolean = true) {
    if (showLoader) {
      this.isLoading.set(true);
    }

    this.postService.getPostById(id).pipe(
      tap((post) => this.post.set(post)),
      finalize(() => this.isLoading.set(false)),
      catchError((error) => {
        if (error.status === 404) {
          this.router.navigate(['/not-found']);

          return throwError(() => error)
        }

        this.toastService.showToast('Something went wrong while loading post', 3000, Variant.ERROR);
        return throwError(() => error)
      })
    ).subscribe()
  }

  onCommentDeleted() {
    this.getPost(this.postId, false)
  }

  onCommentCreated() {
    this.getPost(this.postId, false)
  }
}
