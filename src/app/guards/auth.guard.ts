import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard is a route guard that checks if a user is authenticated and has the correct role.
 * If the user is not authenticated or does not have the correct role, they are redirected to the login page.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Check if the user is authenticated and has the correct role.
   * If the user is not authenticated or does not have the correct role, they are redirected to the login page.
   *
   * @param route The route being navigated to.
   * @returns True if the user is authenticated and has the correct role, false otherwise.
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.auth.getCurrentUser();
    const expectedRole = route.data['role'];
    console.log('User Role:', user?.role, 'Expected Role:', expectedRole);

    if (this.auth.isAuthenticated()) {
      if (user?.role.toLowerCase() === expectedRole) {
        return true;
      } else {
        this.auth.redirectAuthenticatedUser(); // Redirect authenticated users to their respective components
      }
    }

    this.auth.logout();
    return false;
  }
}
