import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  // ✅ Check if code is running in the browser before using localStorage
  const isBrowser =
    typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  const token = isBrowser ? localStorage.getItem('JWT_TOKEN') : null;

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
