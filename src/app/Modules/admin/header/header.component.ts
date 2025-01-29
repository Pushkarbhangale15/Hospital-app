import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

 
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}
    
  logout() {
    this.authService.logout();
  }
  
}
