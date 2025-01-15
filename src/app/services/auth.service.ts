
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.setPersistence('local'); // Set persistence to LOCAL
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/admin/login']);
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}