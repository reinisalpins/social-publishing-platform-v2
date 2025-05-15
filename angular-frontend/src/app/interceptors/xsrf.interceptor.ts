import {HttpInterceptorFn} from '@angular/common/http';

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next(req);
  }

  const token = getXsrfToken();

  if (token) {
    req = req.clone({
      headers: req.headers.set('X-XSRF-TOKEN', token)
    });
  }

  return next(req);
};

const getXsrfToken = (): string | null => {
  const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='));

  return tokenCookie ?
    decodeURIComponent(tokenCookie.split('=')[1]) :
    null;
};
