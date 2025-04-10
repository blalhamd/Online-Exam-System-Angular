import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector); // Delay dependencies until needed

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.error('Full error:', err); // 👈 add this
      const router = injector.get(Router);
      const errorService = injector.get(ErrorService);

      let errorMessage = 'An unexpected error occurred.';

      switch (err.status) {
        case 401:
        case 403:
          router.navigate(['/auth/login']);
          return throwError(() => err);
        case 404:
          errorMessage = 'Error 404: Resource not found.';
          break;
        case 500:
          errorMessage = 'Error 500: Internal server error.';
          break;
        case 400:
          errorMessage = 'Error 400: Bad request.';
          break;
        case 408:
          errorMessage = 'Error 408: Request timed out.';
          break;
        default:
          errorMessage = `Error ${err.status}: ${err.message}`;
          break;
      }

      errorService.setError(errorMessage);
      router.navigate(['/error']);

      return throwError(() => err);
    })
  );
};
