import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const checkPermissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  // const requiredPermissions = route.data.permissions as string[];
  const requiredPermissions = route.data['permissions'] as string[];
  // Check if the token has expired
  authService.checkToken();

  // Get user permissions
  const userPermissions = authService.getPermissions();

  // Check if the user has the required permissions
  const hasPermission = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!hasPermission) {
    // Redirect to a different page if permission is denied
    router.navigate(['/error']); // Adjust the route as necessary
    return false;
  }

  return true; // Allow access
};
