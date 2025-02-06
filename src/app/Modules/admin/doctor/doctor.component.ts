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
  todayDate: string = '';
  isEditing = false;

  selectedDoctor: any = {};
  editedDoctor: any;
  filteredDoctors: any[] = [];
  isSubmitting = false;
  constructor(
    private fb: FormBuilder,
    private operateService: OperateService
  ) {}
  ngOnInit(): void {
    this.getDoctors();
    this.todayDate = new Date()
      .toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1');

    console.log('todayDate:', this.todayDate);

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

  getDoctors() {
    this.operateService.getAllDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.loadAttendanceRecords();
    });
  }

  loadAttendanceRecords() {
    this.operateService
      .getDoctorRecordsByDate(this.todayDate)
      .subscribe((records) => {
        this.doctors.forEach((doctor) => {
          const record = records.find(
            (r: any) => r.doctorName === doctor.doctorName
          );
          doctor.todayAvailable = record?.isAvailable || false;
          doctor.hasRecord = !!record;
        });
        this.filteredDoctors = [...this.doctors];
      });
  }

  
  onSubmit(): void {
    this.isSubmitting = true;
    const action = this.isEditing ? 'update' : 'save';
    const method = this.isEditing
      ? this.operateService.updateDoctor(
          this.editedDoctor.id,
          this.addDoctorForm.value
        )
      : this.operateService.saveDoctorData(this.addDoctorForm.value);

    if (
      this.isEditing &&
      !confirm('Are you sure you want to update this doctor?')
    ) {
      this.isSubmitting = false;
      return;
    }

    method.subscribe(() => {
      this.getDoctors();
      this.isSubmitting = false;
      this.addDoctorForm.reset();
      alert(`Doctor ${action}d successfully`);
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

      doctorImage: doctor.doctorImage,
      roomNo: doctor.roomNo,
    });
  }
  deleteDoctor(doctor: any): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.operateService.deleteDoctor(doctor.id).subscribe(() => {
        this.getDoctors();
      });
    }
  }
  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.doctorName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  viewDoctorModal(doctor: any) {
    this.selectedDoctor = doctor;
  }
}
