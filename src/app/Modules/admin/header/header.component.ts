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
  addDoctorForm!: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.addDoctorForm = this.fb.group({
      doctorName: ['', Validators.required],
      doctorQualification: ['', Validators.required],
      doctorSpecialty: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      doctorContactNumber: ['', Validators.required],
      doctorAddress: ['', Validators.required],
      doctorImage: ['', Validators.required],
      roomNo: ['', Validators.required],
    });
  }

  logout() {
    this.authService.logout();
  }
  closeModal(){
    this.addDoctorForm.reset();
  }
  onSubmit() {
    console.log(this.addDoctorForm.value);
  }
}
