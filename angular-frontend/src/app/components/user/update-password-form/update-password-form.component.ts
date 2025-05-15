import {Component, inject, signal} from '@angular/core';
import {ButtonComponent} from '../../button/button.component';
import {InputComponent} from '../../input/input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {catchError, finalize, tap, throwError} from 'rxjs';

@Component({
  selector: 'app-update-password-form',
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.css'
})
export class UpdatePasswordFormComponent {
  readonly fb = inject(FormBuilder);
  readonly userService = inject(UserService);

  protected updatePasswordForm: FormGroup = this.fb.group({
    current_password: [''],
    new_password: [''],
    new_password_confirmation: [''],
  });

  readonly isLoading = signal(false);
  readonly errors = signal<{ [key: string]: string }>({});

  save() {
    this.isLoading.set(true);

    this.userService.updatePassword(this.updatePasswordForm.value).pipe(
      tap(() => {
        this.errors.set({});
        this.updatePasswordForm.reset();
      }),
      catchError((error) => {
        if (error.status === 422 && error.error?.errors) {
          this.errors.set(error.error.errors);
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
