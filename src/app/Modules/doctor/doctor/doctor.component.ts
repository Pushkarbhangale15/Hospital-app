import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperateService } from 'src/app/services/operate.service'; // Import the OperateService
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent {
  addDoctorForm!: FormGroup;
  doctors: any[] = [];
  isEditing = false;
  selectedDoctor: any={};
  editedDoctor: any;
  filteredDoctors: any[] = [];
  isSubmitting = false;
  constructor(
    private fb: FormBuilder,
    private operateService: OperateService
  ) {}
  ngOnInit(): void {
    this.getDoctors();

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
      doctorImage: ['', Validators.required],
      isAvailable: [false], // Initialize the availability state
      roomNo: ['', [Validators.required, Validators.min(1)]],
    });
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.addDoctorForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.addDoctorForm.patchValue({
          doctorImage: base64Image,
        });
        this.addDoctorForm.get('doctorImage')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }
  closeModal() {
    this.addDoctorForm.reset();
    const fileInput = document.getElementById(
      'doctorImage'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    this.isEditing = false;
    this.addDoctorForm.reset();
  }
  onSubmit(): void {
    this.isSubmitting = true;
    if (this.isEditing) {
      this.operateService
        .updateDoctor(this.editedDoctor.id, this.addDoctorForm.value)
        .subscribe(() => {
          this.getDoctors();
          this.isEditing = false;
          this.isSubmitting = false;
          this.addDoctorForm.reset();
        });
    } else {
      this.operateService
        .saveDoctorData(this.addDoctorForm.value)
        .subscribe(() => {
          this.getDoctors();
          this.isSubmitting = false;
          this.addDoctorForm.reset();
        });
    }
  }

  getDoctors() {
    this.operateService.getAllDoctors().subscribe((doctors) => {
      console.log(doctors);
      this.doctors = doctors;
      this.filteredDoctors = this.doctors;
    });
  }
  // Function to edit a doctor
  editDoctor(doctor: any): void {
    this.isEditing = true;
    this.editedDoctor = doctor;
    this.addDoctorForm.patchValue({
      doctorName: doctor.doctorName,
      doctorQualification: doctor.doctorQualification,
      doctorSpecialty: doctor.doctorSpecialty,
      startTime: doctor.startTime,
      endTime: doctor.endTime,
      doctorContactNumber: doctor.doctorContactNumber,
      doctorAddress: doctor.doctorAddress,
      isAvailable: doctor.isAvailable,
      doctorImage: doctor.doctorImage,
      roomNo: doctor.roomNo,
    });
  }
  deleteDoctor(doctor: any): void {
    this.operateService.deleteDoctor(doctor.id).subscribe(() => {
      this.getDoctors();
    });
  }
  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.doctorName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  viewDoctorModal(doctor: any) {
    this.selectedDoctor=doctor;
  }
}

