import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {xsrfInterceptor} from './interceptors/xsrf.interceptor';
import {UserService} from './services/user.service';
import {catchError, of} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAppInitializer(() => {
      const userService = inject(UserService);

      return userService.getCurrentUser().pipe(
        catchError(error => {
          userService.clearUser();
          return of(null);
        })
      );
    }),
    provideHttpClient(
      withInterceptors([xsrfInterceptor])
    ),
  ]
};
