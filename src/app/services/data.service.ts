import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  constructor(private http: HttpClient, private auth: AngularFireAuth,private firestore: AngularFirestore, private router: Router) {}
  

  // Login method
  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['home']);
    },err=>{
      alert("Something went wrong");
      this.router.navigate(['/login']);
    }
    );
  }

  // Register method
  
  

  // Sign out method
  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
  
}
