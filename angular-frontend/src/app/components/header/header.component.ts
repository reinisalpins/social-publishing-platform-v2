import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {ButtonComponent} from '../button/button.component';
import {AuthService} from '../../services/auth.service';
import {catchError, finalize, throwError} from 'rxjs';
import {ToastService, Variant} from '../../services/toast.service';

interface NavItem {
  name: string;
  href: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly categoryService = inject(CategoryService);
  readonly authService = inject(AuthService);
  readonly toastService = inject(ToastService);

  protected isMenuOpen = signal(false);
  protected isLoggingOut = signal(false);

  logout() {
    this.isLoggingOut.set(true);

    this.authService.logout().pipe(
      catchError((error) => {
        this.toastService.showToast('Something went wrong', 3000, Variant.ERROR);
        return throwError(() => error);
      }),
      finalize(() => this.isLoggingOut.set(false)),
    ).subscribe();
  }
}
