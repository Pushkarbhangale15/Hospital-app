import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private adminCredentials = {
    email: 'admin@gmail.com',
    password: 'admin123',
  };

  login(email: string, password: string) {
    // Check if the provided credentials match the admin credentials
    if (
      email === this.adminCredentials.email &&
      password === this.adminCredentials.password
    ) {
      localStorage.setItem('token', 'true'); // Simulate token storage
      this.router.navigate(['/admin/dashboard']);
    } else {
      alert('Invalid credentials'); // Log error for invalid credentials
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

