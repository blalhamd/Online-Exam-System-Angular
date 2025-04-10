import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from '../services/auth-service.service';

export const checkExpireInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  authService.checkToken();
  return next(req);
};
