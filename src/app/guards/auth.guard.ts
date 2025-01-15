import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.auth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('token', 'true');
        if (this.router.url === '/login') {
          this.router.navigate(['/admin/home']);
        }
      } else {
        localStorage.removeItem('token');
        if (this.router.url !== '/register') {
          this.router.navigate(['/admin/login']);
        }
      }
    });

    const isAuthenticated = this.auth.currentUser !== null;
    const path = next.routeConfig?.path;

    // Allow access to public routes
    const publicRoutes = ['login', 'register'];
    if (publicRoutes.includes(path || '')) {
      return true;
    }

    // Check authentication for protected routes
    if (isAuthenticated) {
      return true;
    }

    // Redirect to login if not authenticated
    this.router.navigate(['/admin/login']);
    return false;
  }
}
