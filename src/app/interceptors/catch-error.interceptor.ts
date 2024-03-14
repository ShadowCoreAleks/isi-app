import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          router.navigate(['/', 'not-found']);
        } else if (error.status === 403) {
          router.navigate(['/', 'forbidden']);
        }
      }
      return throwError(error);
    })
  );
};
