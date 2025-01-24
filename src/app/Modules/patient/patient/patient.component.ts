import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OperateService } from 'src/app/services/operate.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent {
  patients: any[] = []; // Array to hold the list of patients
  searchTerm: string = ''; // Property to hold the search term
  filteredPatients: any[] = []; // Array to hold the filtered patients
  addPatientForm!: FormGroup;
  constructor(
    private operatorService: OperateService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
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

  onPatientSubmit() {
    console.log(this.addPatientForm.value);
    // Assuming there's a method in OperateService to add a patient
    this.operatorService
      .savePatientData(this.addPatientForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.addPatientForm.reset();
  }
  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.filteredPatients = this.patients.filter((patient) =>
      patient.patientName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
