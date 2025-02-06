import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { OperateService } from 'src/app/services/operate.service';

@Component({
  selector: 'app-doctor-access',
  templateUrl: './doctor-access.component.html',
  styleUrls: ['./doctor-access.component.css'],
})
export class DoctorAccessComponent {
  currentUser: any;
  todayDate: string = '';
  doctorDetails: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private operateService: OperateService
  ) {}

  ngOnInit(): void {
    this.todayDate = new Date()
      .toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1');

    console.log('todayDate:', this.todayDate);
    this.currentUser = this.authService.getCurrentUser(); // Fetch the current user's details
    console.log('currentUser:', this.currentUser.id);
    this.fetchDoctorDetails(this.currentUser.id); // This will now trigger loadAttendanceRecords once done
  }

  fetchDoctorDetails(doctorId: string) {
    this.http.get(`http://localhost:3000/doctors/${doctorId}`).subscribe({
      next: (details) => {
        this.doctorDetails = details;
        console.log('Fetched doctor name:', this.doctorDetails.doctorName);
        this.loadAttendanceRecords(); // Now called after doctorDetails is set
      },
      error: (err) => console.error('Error fetching doctor details:', err),
    });
  }

  loadAttendanceRecords() {
    this.operateService
      .getDoctorRecordsByDate(this.todayDate)
      .subscribe((records) => {
        console.log('Attendance records:', records);
        // Check if any record matches the current doctor's name
        const doctorRecord = records.find(
          (record: any) => record.doctorName === this.doctorDetails.doctorName
        );
        
        if (doctorRecord) {
          this.doctorDetails.hasRecord = true;
          this.doctorDetails.todayAvailable = doctorRecord.isAvailable;
        } else {
          this.doctorDetails.hasRecord = false;
          this.doctorDetails.todayAvailable = undefined;
        }
      });
  }  
  
  openAttendanceDialog(doctor: any, event: MouseEvent) {
    event.preventDefault(); // Prevent immediate checkbox toggle
    if (doctor.hasRecord) return;

    // Set the modal text
    const confirmTextElement = document.getElementById('confirmText');
    if (confirmTextElement) {
      confirmTextElement.innerText = `Set attendance for Dr. ${doctor.doctorName}?`;
    }

    // Get buttons and attach new event listeners
    const availableButton = document.getElementById(
      'confirmButton'
    ) as HTMLButtonElement;
    const unavailableButton = document.getElementById(
      'unavailableButton'
    ) as HTMLButtonElement;

    if (availableButton && unavailableButton) {
      // Remove existing listeners to avoid duplication
      availableButton.onclick = null;
      unavailableButton.onclick = null;

      availableButton.onclick = () => this.toggleAvailability(doctor, true);
      unavailableButton.onclick = () => this.toggleAvailability(doctor, false);
    }

    // Show the Bootstrap modal
    const modalElement = document.getElementById('openAttendanceDialog');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Modified toggle method
  toggleAvailability(doctor: any, status: boolean) {
    const record = {
      doctorName: doctor.doctorName,
      date: this.todayDate,
      isAvailable: status,
    };

    this.operateService.addDoctorRecord(record).subscribe(() => {
      // Update the component's doctorDetails to reflect changes
      this.doctorDetails.todayAvailable = status;
      this.doctorDetails.hasRecord = true;
    });
  }

  logout(): void {
    this.authService.logout(); // Log out the user
  }
}
