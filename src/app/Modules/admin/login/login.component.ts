import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginForm!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });

    // Check if the user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.authService.redirectAuthenticatedUser(); // Redirect to the appropriate component
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }

    this.login();
  }

  login() {
    this.authService
      .login(this.LoginForm.value.Email, this.LoginForm.value.Password)
      .subscribe({
        next: (user) => {
          console.log('User:', user);
          if (user) {
            // Redirect based on user role is handled in AuthService
          } else {
            alert('Invalid credentials');
          }
        },
        error: (err) => console.error('Login error:', err),
      });
  }
}
