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
  addPatientForm!: FormGroup;
  addReceptionForm!: FormGroup;
  isSubmitting = false;
  isReceptionSubmitting = false;
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.addDoctorForm = this.fb.group({
      doctorName: ['', [Validators.required, Validators.minLength(2)]],
      doctorQualification: ['', Validators.required],
      doctorSpecialty: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      doctorContactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      doctorAddress: ['', Validators.required],
      doctorImage: [null, Validators.required],
      roomNo: ['', [Validators.required, Validators.min(1)]],
    });
    this.addPatientForm = this.fb.group({
      patientName: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      doctorName: ['', Validators.required],
      bookingDate: ['', Validators.required],
      opdTime: ['', Validators.required],
      bookingBy: ['', Validators.required],
      feeStatus: ['', Validators.required],
      joiningDate: ['', Validators.required],
      retireDate: ['', Validators.required],
    });

    // Set default booking date to today
    this.addPatientForm.patchValue({
      bookingDate: new Date().toISOString().split('T')[0],
    });

    this.addReceptionForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        contactNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        address: ['', Validators.required],
        qualification: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        joiningDate: ['', Validators.required],
        retireDate: ['', Validators.required],
        staffImage: [null, Validators.required],
      },
      {
        validators: this.dateValidator,
      }
    );

    this.addReceptionForm.patchValue({
      joiningDate: new Date().toISOString().split('T')[0],
    });
  }

  private dateValidator(group: FormGroup): { [key: string]: any } | null {
    const joiningDate = group.get('joiningDate')?.value;
    const retireDate = group.get('retireDate')?.value;

    if (
      joiningDate &&
      retireDate &&
      new Date(joiningDate) >= new Date(retireDate)
    ) {
      return { dateError: 'Retire date must be after joining date' };
    }
    return null;
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.addDoctorForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
  isPatientFieldInvalid(fieldName: string): boolean {
    const field = this.addPatientForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
  isReceptionFieldInvalid(fieldName: string): boolean {
    const field = this.addReceptionForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.addDoctorForm.patchValue({
      doctorImage: file,
    });
    this.addDoctorForm.get('doctorImage')?.updateValueAndValidity();
  }
  onFileChangeStaff(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.addReceptionForm.patchValue({
      staffImage: file,
    });
    this.addReceptionForm.get('staffImage')?.updateValueAndValidity();
  }
  logout() {
    this.authService.logout();
  }
  closeModal() {
    this.addDoctorForm.reset();
    const fileInput = document.getElementById(
      'doctorImage'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.addPatientForm.reset();
    this.addDoctorForm.reset();
    const fileStaffInput = document.getElementById(
      'staffImage'
    ) as HTMLInputElement;
    if (fileStaffInput) {
      fileStaffInput.value = '';
    }
    this.addReceptionForm.reset();
  }
  async onSubmit(): Promise<void> {
    if (this.addDoctorForm.valid && !this.isSubmitting) {
      try {
        this.isSubmitting = true;
        const formData = this.addDoctorForm.value;
        // Add your API call here
        console.log('Form submitted:', formData);
        this.closeModal();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.markFormFieldsAsTouched();
    }
  }

  private markFormFieldsAsTouched(): void {
    Object.keys(this.addDoctorForm.controls).forEach((key) => {
      const control = this.addDoctorForm.get(key);
      control?.markAsTouched();
    });
  }
  onPatientSubmit() {
    console.log(this.addPatientForm.value);
    this.addPatientForm.reset();
  }
  async onReceptionSubmit(): Promise<void> {
    if (this.addReceptionForm.valid && !this.isReceptionSubmitting) {
      try {
        this.isReceptionSubmitting = true;
        const formData = this.addReceptionForm.value;
        // Add your API call here
        console.log('Form submitted:', formData);
        this.closeModal();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.isReceptionSubmitting = false;
      }
    } else {
      this.markFormFieldsAsTouchedReception();
    }
  }
  private markFormFieldsAsTouchedReception(): void {
    Object.keys(this.addReceptionForm.controls).forEach((key) => {
      const control = this.addReceptionForm.get(key);
      control?.markAsTouched();
    });
  }
}
