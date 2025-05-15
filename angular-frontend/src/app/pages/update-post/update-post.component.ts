import {Component, inject, OnInit, signal} from '@angular/core';
import {PostFormComponent} from '../../components/posts/post-form/post-form.component';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {Post} from '../../models/post';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {LoaderComponent} from '../../components/loader/loader.component';

@Component({
  selector: 'app-update-post',
  imports: [
    PostFormComponent,
    LoaderComponent
  ],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit {
  readonly postService = inject(PostService);
  readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading = signal(false);
  readonly post = signal<Post | null>(null);

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id') || '';

    this.getPost(postId);
  }

  getPost(id: string) {
    this.isLoading.set(true);

    this.postService.getPostById(id).pipe(
      tap((post) => this.post.set(post)),
      catchError((error) => {
        return throwError(() => error);
      }),
      finalize(() => this.isLoading.set(false)),
    ).subscribe()
  }
}
