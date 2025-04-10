import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { environment } from '../../../environments/environment.development';

export const addJwtTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const token = authService.getToken();
  const isApiRequest = req.url.startsWith(environment.baseUrl);

  if (token && isApiRequest) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(`authReq.headers: ${authReq.headers.get('Authorization')}`);
    return next(authReq);
  }

  return next(req);
};
