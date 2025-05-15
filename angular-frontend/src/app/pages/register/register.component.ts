import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {catchError, finalize, switchMap, tap, throwError} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  readonly authService = inject(AuthService);
  readonly userService = inject(UserService);
  readonly router = inject(Router);
  private fb = inject(FormBuilder);

  protected registerForm: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    password_confirmation: ['']
  });

  readonly isLoading = signal(false);
  readonly errors = signal<{ [key: string]: string }>({});

  register() {
    this.isLoading.set(true);

    this.authService.register(this.registerForm.value).pipe(
      tap(() => {
        this.errors.set({});
        this.registerForm.reset();
      }),
      switchMap(() => this.userService.getCurrentUser()),
      tap(() => this.router.navigate(['/'])),
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
