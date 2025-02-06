import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { OperateService } from 'src/app/services/operate.service';

@Component({
  selector: 'app-recipient-access',
  templateUrl: './recipient-access.component.html',
  styleUrls: ['./recipient-access.component.css'],
})
export class RecipientAccessComponent {
  currentUser: any;
  todayDate: string = '';
  recipientDetails: any;

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
    this.currentUser = this.authService.getCurrentUser();
    console.log('currentUser:', this.currentUser.id);
    this.fetchRecipientDetails(this.currentUser.id);
  }

  fetchRecipientDetails(recipientId: string) {
    this.http.get(`http://localhost:3000/recipients/${recipientId}`).subscribe({
      next: (details) => {
        this.recipientDetails = details;
        console.log(
          'Fetched recipient name:',
          this.recipientDetails.recipientName
        );
        this.loadAttendanceRecords();
      },
      error: (err) => console.error('Error fetching recipient details:', err),
    });
  }

  loadAttendanceRecords() {
    this.operateService
      .getRecipientRecordsByDate(this.todayDate)
      .subscribe((records) => {
        console.log('Attendance records:', records);
        const recipientRecord = records.find(
          (record: any) =>
            record.name === this.recipientDetails.name
        );

        if (recipientRecord) {
          this.recipientDetails.hasRecord = true;
          this.recipientDetails.todayAvailable = recipientRecord.isAvailable;
        } else {
          this.recipientDetails.hasRecord = false;
          this.recipientDetails.todayAvailable = undefined;
        }
      });
  }

  openAttendanceDialog(recipient: any, event: MouseEvent) {
    event.preventDefault();
    if (recipient.hasRecord) return;

    const confirmTextElement = document.getElementById('confirmText');
    if (confirmTextElement) {
      confirmTextElement.innerText = `Set attendance for ${recipient.recipientName}?`;
    }

    const availableButton = document.getElementById(
      'confirmButton'
    ) as HTMLButtonElement;
    const unavailableButton = document.getElementById(
      'unavailableButton'
    ) as HTMLButtonElement;

    if (availableButton && unavailableButton) {
      availableButton.onclick = null;
      unavailableButton.onclick = null;

      availableButton.onclick = () => this.toggleAvailability(recipient, true);
      unavailableButton.onclick = () =>this.toggleAvailability(recipient, false);
    }

    const modalElement = document.getElementById('openAttendanceDialog');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  toggleAvailability(recipient: any, status: boolean) {
    const record = {
      name: recipient.name,
      date: this.todayDate,
      isAvailable: status,
    };

    this.operateService.addRecipientRecord(record).subscribe(() => {
      this.recipientDetails.todayAvailable = status;
      this.recipientDetails.hasRecord = true;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
