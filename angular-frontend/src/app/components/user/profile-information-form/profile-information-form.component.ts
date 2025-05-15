import {Component, inject, OnInit, signal} from '@angular/core';
import {ButtonComponent} from "../../button/button.component";
import {InputComponent} from "../../input/input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {catchError, finalize, tap, throwError} from 'rxjs';

@Component({
  selector: 'app-profile-information-form',
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-information-form.component.html',
  styleUrl: './profile-information-form.component.css'
})
export class ProfileInformationFormComponent implements OnInit {
  readonly fb = inject(FormBuilder);
  readonly userService = inject(UserService);

  protected profileInformationForm: FormGroup = this.fb.group({
    name: [''],
    email: ['']
  });

  readonly isLoading = signal(false);
  readonly errors = signal<{ [key: string]: string }>({});

  ngOnInit() {
    this.profileInformationForm.patchValue({
      name: this.userService.user()!.name,
      email: this.userService.user()!.email
    })
  }

  save() {
    this.isLoading.set(true);

    this.userService.updateUser(this.profileInformationForm.value).pipe(
      tap(() => {
        this.errors.set({});
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
