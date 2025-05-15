import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {catchError, finalize, switchMap, tap, throwError} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly authService = inject(AuthService);
  readonly userService = inject(UserService);
  readonly router = inject(Router);
  private fb = inject(FormBuilder);

  protected loginForm: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });

  readonly isLoading = signal(false);
  readonly errors = signal<{ [key: string]: string }>({});

  login() {
    this.isLoading.set(true);
    this.authService.login(this.loginForm.value).pipe(
      tap(() => {
        this.errors.set({});
        this.loginForm.reset();
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
