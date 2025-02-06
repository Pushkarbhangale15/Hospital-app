import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

/**
 * AuthService handles user authentication, including login, logout, and checking if a user is authenticated.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .get<any[]>(
        `http://localhost:3000/users?email=${email}&password=${password}`
      )
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('token', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            this.redirectAuthenticatedUser(); // Redirect after successful login
            return user;
          }
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Redirects authenticated users to the appropriate component based on their role.
   */
  redirectAuthenticatedUser() {
    const user = this.getCurrentUser();
    if (user) {
      if (user.role.toLowerCase() === 'doctor') {
        this.router.navigate(['doctor-access']);
      } else if (user.role.toLowerCase() === 'admin') {
        this.router.navigate(['admin/dashboard']);
      } else if (user.role.toLowerCase() === 'recipient') {
        this.router.navigate(['recipient-access']);
      }
    }
  }
}
