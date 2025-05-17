import {Component, inject, input, output, signal} from '@angular/core';
import {TextareaComponent} from '../../textarea/textarea.component';
import {ButtonComponent} from '../../button/button.component';
import {PostService} from '../../../services/post.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'app-create-comment',
  imports: [
    TextareaComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css'
})
export class CreateCommentComponent {
  readonly postId = input.required<number>();
  readonly commentCreated = output<void>();
  readonly errors = signal<{ [key: string]: string }>({});

  readonly postService = inject(PostService);
  readonly fb = inject(FormBuilder);
  readonly toast = inject(ToastService);

  readonly isLoading = signal(false);

  readonly commentForm = this.fb.group({
    content: ['']
  });

  createComment() {
    this.isLoading.set(true);

    this.postService.createComment(
      this.postId(),
      this.commentForm.value.content ?? ''
    ).pipe(
      tap(() => {
        this.commentCreated.emit();
        this.errors.set({});
        this.commentForm.reset();
        this.toast.showToast('Comment created successfully');
      }),
      finalize(() => this.isLoading.set(false)),
      catchError((error) => {
        if (error.status === 422 && error.error?.errors) {
          this.errors.set(error.error.errors);
        }
        return throwError(() => error);
      })
    ).subscribe();
  }

  getError(field: string): string {
    return this.errors()[field] || '';
  }
}
