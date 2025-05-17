import {Component, inject, OnInit, signal} from '@angular/core';
import {ManagePostCardComponent} from '../../components/posts/manage-post-card/manage-post-card.component';
import {RouterLink} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {finalize, tap} from 'rxjs';
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

  getUserPosts(showLoader: boolean = true) {
    if (showLoader) {
      this.isLoading.set(true);
    }

    this.postService.getAuthUserPosts().pipe(
      tap((posts) => this.posts.set(posts)),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }

  onPostDeleted() {
    this.getUserPosts(false);
  }
}
