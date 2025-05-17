import {Component, inject, input, output, signal} from '@angular/core';
import {PostComment} from '../../../models/post';
import {DatePipe} from '@angular/common';
import {ButtonComponent} from '../../button/button.component';
import {UserService} from '../../../services/user.service';
import {PostService} from '../../../services/post.service';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {ToastService, Variant} from '../../../services/toast.service';

@Component({
  selector: 'app-comment-card',
  imports: [
    DatePipe,
    ButtonComponent
  ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent {
  readonly comment = input.required<PostComment>();
  readonly commentDeleted = output<void>();

  readonly isDeleting = signal(false);

  readonly userService = inject(UserService);
  readonly postService = inject(PostService);
  readonly toastService = inject(ToastService);

  deleteComment(commentId: number) {
    this.isDeleting.set(true);

    this.postService.deleteComment(commentId).pipe(
      tap(() => {
        this.commentDeleted.emit();
        this.toastService.showToast('Comment deleted successfully');
      }),
      catchError((error) => {
        this.toastService.showToast('Something went wrong', 3000, Variant.ERROR);
        return throwError(() => error);
      }),
      finalize(() => this.isDeleting.set(false))
    ).subscribe();
  }
}
