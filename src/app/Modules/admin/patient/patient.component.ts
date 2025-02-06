import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OperateService } from 'src/app/services/operate.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent {
  isSubmitting = false; // Flag to prevent multiple submissions
  selectedPatient: any = {}; // Property to hold the selected patient
  patients: any[] = []; // Array to hold the list of patients
  searchTerm: string = ''; // Property to hold the search term
  filteredPatients: any[] = []; // Array to hold the filtered patients
  isEditing = false; //to state whether editing is being done.
  currentPage = 1;
  recordsPerPage = 20;
  totalPages: number = 0;
  addPatientForm!: FormGroup;
  constructor(
    private operatorService: OperateService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.calculateTotalPages();
    this.addPatientForm = this.fb.group(
      {
        patientName: ['', Validators.required],
        contactNo: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        address: ['', Validators.required],
        doctorName: ['', Validators.required],
        bookingDate: ['', Validators.required],
        opdTime: ['', Validators.required],
        bookingBy: ['', Validators.required],
        feeStatus: ['', Validators.required],
        patientType: ['', Validators.required],
        admitDate: ['', Validators.required],
        dischargeDate: ['', Validators.required],
      },
      {
        validators: this.dateValidator,
      }
    );

    this.fetchPatients(); // Fetch patients on initialization
    // Set default booking date to today
    this.addPatientForm.patchValue({
      bookingDate: new Date().toISOString().split('T')[0],
    });
  }
  private dateValidator(group: FormGroup): { [key: string]: any } | null {
    const admitDate = group.get('admitDate')?.value;
    const dischargeDate = group.get('dischargeDate')?.value;

    if (
      admitDate &&
      dischargeDate &&
      new Date(admitDate) >= new Date(dischargeDate)
    ) {
      return { dateError: 'Retire date must be after joining date' };
    }
    return null;
  }
  isPatientFieldInvalid(fieldName: string): boolean {
    const field = this.addPatientForm.get(fieldName);

    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
  closeModal() {
    this.addPatientForm.reset();
     this.isEditing = false;
  }

  fetchPatients(): void {
    // Assuming there's a method in AuthService to get patients
    this.operatorService.getAllPatients().subscribe((patients) => {
      console.log(patients);
      this.patients = patients; // Populate the patients array
      this.filteredPatients = this.patients; // Populate the filtered patients array
    });
    this.addPatientForm.reset();
  }

  onSubmit(): void {
    this.isSubmitting = true;
    const action = this.isEditing ? 'update' : 'save';
    const method = this.isEditing
      ? this.operatorService.updatePatient(
          this.selectedPatient.id,
          this.addPatientForm.value.patientType === 'OPD'
            ? {
                ...this.addPatientForm.value,
                admitDate: null,
                dischargeDate: null,
              }
            : { ...this.addPatientForm.value, opdTime: null }
        )
      : this.operatorService.savePatientData(this.addPatientForm.value);

    if (
      this.isEditing &&
      !confirm('Are you sure you want to update this patient?')
    ) {
      this.isSubmitting = false;
      return;
    }

    method.subscribe(() => {
      this.fetchPatients();
      this.isSubmitting = false;
      this.addPatientForm.reset();
      alert(`Patient ${action}d successfully`);
    });
  }
  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.filteredPatients = this.patients.filter((patient) =>
      patient.patientName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  // viewing the details of a patient
  viewPatientModal(patient: any) {
    this.selectedPatient = patient;
  }

  //edit the details of the patient
  // patient.component.ts
  editPatient(patient: any) {
    this.selectedPatient = patient;
    this.isEditing = true;
    this.addPatientForm.patchValue({
      patientName: this.selectedPatient.patientName,
      contactNo: this.selectedPatient.contactNo,
      doctorName: this.selectedPatient.doctorName,
      bookingDate: this.selectedPatient.bookingDate,
      patientType: this.selectedPatient.patientType,

      opdTime:
        this.selectedPatient.patientType === 'OPD'
          ? this.selectedPatient.opdTime
          : null,
      bookingBy: this.selectedPatient.bookingBy,
      feeStatus: this.selectedPatient.feeStatus,
      admitDate:
        this.selectedPatient.patientType === 'IPD'
          ? this.selectedPatient.admitDate
          : null,
      dischargeDate:
        this.selectedPatient.patientType === 'IPD'
          ? this.selectedPatient.dischargeDate
          : null,
      address: this.selectedPatient.address,
    });
  }

  // For deleting the patient
  deletePatient(patient: any) {
    // Call the API to delete the patient
    if (confirm('Are you sure you want to delete this patient?')) {
      this.operatorService.deletePatient(patient.id).subscribe(() => {
        // Update the patient list
        this.fetchPatients();
      });
    } else {
      return;
    }
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(
      this.filteredPatients.length / this.recordsPerPage
    );
  }
  getPatientsForCurrentPage(): any[] {
    const start = (this.currentPage - 1) * this.recordsPerPage;
    const end = start + this.recordsPerPage;
    return this.filteredPatients.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  getPages(): number[] {
    this.totalPages = Math.ceil(
      this.filteredPatients.length / this.recordsPerPage
    );
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
