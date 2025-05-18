import {Component, inject, input, OnInit, signal} from '@angular/core';
import {ButtonComponent} from '../../button/button.component';
import {InputComponent} from '../../input/input.component';
import {TextareaComponent} from '../../textarea/textarea.component';
import {MultipleSelectComponent} from '../../multiple-select/multiple-select.component';
import {CategoryService} from '../../../services/category.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PostService} from '../../../services/post.service';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Post} from '../../../models/post';
import {ToastService, Variant} from '../../../services/toast.service';

@Component({
  selector: 'app-post-form',
  imports: [
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    MultipleSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {
  readonly categoryService = inject(CategoryService);
  readonly postService = inject(PostService);
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  readonly toastService = inject(ToastService);

  readonly isLoading = signal(false);
  readonly errors = signal<{ [key: string]: string }>({});
  readonly isEditMode = signal(false);

  existingPost = input<Post | null>(null);

  protected postForm: FormGroup = this.fb.group({
    title: [''],
    content: [''],
    categories: [[]]
  });

  readonly categoryOptions = this.categoryService.categories().map(category => ({
    label: category.name,
    value: category.id.toString()
  }));

  ngOnInit() {
    if (this.existingPost()) {
      this.isEditMode.set(true);
      const post = this.existingPost()!;
      this.postForm.setValue({
        title: post.title,
        content: post.content,
        categories: post.categories?.map(cat => cat.id.toString()) || []
      });
    }
  }

  save() {
    const payload = this.postForm.value;
    this.isLoading.set(true);
    this.errors.set({});

    const request = this.isEditMode()
      ? this.postService.updatePost(this.existingPost()!.id, payload)
      : this.postService.createPost(payload);

    request.pipe(
      tap(() => {
        this.toastService.showToast('Post saved successfully');
        this.router.navigate(['/posts/manage']);
      }),
      catchError((error) => {
        if (error.status === 422 && error.error?.errors) {
          this.errors.set(error.error.errors);
        } else {
          this.toastService.showToast('Something went wrong', 3000, Variant.ERROR);
        }
        return throwError(() => error);
      }),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }

  getError(field: string): string {
    return this.errors()[field] || '';
  }
}
