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
    this.todayDate = new Date().toISOString().split('T')[0];

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

  // modal trigger method
  openAttendanceDialog(doctor: any) {
    if (doctor.hasRecord) return;

    // Set the modal text dynamically
    const confirmTextElement = document.getElementById('confirmText');
    if (confirmTextElement) {
      confirmTextElement.innerText = `Set attendance for Dr. ${doctor.doctorName}?`;
    }

    // Get buttons and attach event listeners
    const availableButton = document.getElementById(
      'confirmButton'
    ) as HTMLButtonElement;
    const unavailableButton = document.getElementById(
      'unavailableButton'
    ) as HTMLButtonElement;

    if (availableButton && unavailableButton) {
      availableButton.onclick = () => this.toggleAvailability(doctor, true);
      unavailableButton.onclick = () => this.toggleAvailability(doctor, false);
      console.log('availableButton:', availableButton);
      console.log('unavailableButton:', unavailableButton);
    }
  }

  // Modified toggle method
  toggleAvailability(doctor: any, status: boolean) {
    console.log('toggleAvailability status:', status);
    const record = {
      doctorName: doctor.doctorName,
      date: this.todayDate,
      isAvailable: status,
    };

    this.operateService.addDoctorRecord(record).subscribe(() => {
      doctor.todayAvailable = status;
      doctor.hasRecord = true;
      this.filteredDoctors = [...this.filteredDoctors]; // Trigger change detection
    });
   
    console.log('toggleAvailability status:', status);
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
