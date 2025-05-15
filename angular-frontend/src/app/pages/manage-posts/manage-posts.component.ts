import {Component, inject, OnInit, signal} from '@angular/core';
import {ManagePostCardComponent} from '../../components/posts/manage-post-card/manage-post-card.component';
import {RouterLink} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {catchError, finalize, switchMap, tap, throwError} from 'rxjs';
import {LoaderComponent} from '../../components/loader/loader.component';

@Component({
  selector: 'app-manage-posts',
  imports: [
    ManagePostCardComponent,
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './manage-posts.component.html',
  styleUrl: './manage-posts.component.css'
})
export class ManagePostsComponent implements OnInit {
  readonly postService = inject(PostService);

  readonly posts = signal<Post[]>([]);
  readonly isLoading = signal(false);

  ngOnInit() {
    this.getUserPosts();
  }

  getUserPosts() {
    this.isLoading.set(true);

    this.postService.getAuthUserPosts().pipe(
      tap((posts) => this.posts.set(posts)),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).pipe(
      switchMap(() => this.postService.getAuthUserPosts()),
      finalize(() => this.isLoading.set(false)),
      catchError((error) => {
        return throwError(() => error);
      }),
    ).subscribe();
  }
}
