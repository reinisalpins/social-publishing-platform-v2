import {Component, inject, input, output, signal} from '@angular/core';
import {ButtonComponent} from "../../button/button.component";
import {Post} from '../../../models/post';
import {RouterLink} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {ToastService, Variant} from '../../../services/toast.service';

@Component({
  selector: 'app-manage-post-card',
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './manage-post-card.component.html',
  styleUrl: './manage-post-card.component.css'
})
export class ManagePostCardComponent {
  readonly postService = inject(PostService);
  readonly toastService = inject(ToastService);

  readonly post = input.required<Post>();
  readonly postDeleted = output<void>();

  readonly isLoading = signal(false);

  deletePost(postId: number) {
    this.isLoading.set(true);

    this.postService.deletePost(postId).pipe(
      tap(() => {
        this.toastService.showToast('Post deleted successfully');
        this.postDeleted.emit();
      }),
      finalize(() => this.isLoading.set(false)),
      catchError((error) => {
        this.toastService.showToast('Something went wrong', 3000, Variant.ERROR);
        return throwError(() => error);
      }),
    ).subscribe();
  }
}
