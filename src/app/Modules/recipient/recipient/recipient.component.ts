import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperateService } from 'src/app/services/operate.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css'],
})
export class RecipientComponent {
  addRecipientForm!: FormGroup;
  isSubmitting = false;
  editedRecipient: any;
  todayDate: string = '';
  recipients: any[] = []; // Array to hold the list of recipients
  filteredRecipients: any[] = []; // Array to hold the filtered recipients
  isEditing = false; //to state whether editing is being done.
  selectedRecipient: any = {}; // Property to hold the selected recipient

  constructor(
    private operateService: OperateService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRecipients();
    this.todayDate = new Date().toISOString().split('T')[0];
    this.addRecipientForm = this.fb.group(
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
    this.addRecipientForm.patchValue({
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
  isRecipientFieldInvalid(fieldName: string): boolean {
    const field = this.addRecipientForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onFileChangeStaff(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.addRecipientForm.patchValue({
          staffImage: base64Image,
        });
        this.addRecipientForm.get('staffImage')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }
  getRecipients() {
    this.operateService.getAllRecipients().subscribe((recipients: any) => {
      console.log(recipients);
      this.recipients = recipients;
       this.loadAttendanceRecords();
    });
  }
  closeModal() {
    const fileStaffInput = document.getElementById(
      'staffImage'
    ) as HTMLInputElement;
    if (fileStaffInput) {
      fileStaffInput.value = '';
    }
    this.addRecipientForm.reset();
    this.isEditing = false;
  }
  // In RecipientComponent
  onSubmit(): void {
    this.isSubmitting = true;
    const action = this.isEditing ? 'update' : 'save';
    const method = this.isEditing
      ? this.operateService.updateRecipient(
          this.editedRecipient.id,
          this.addRecipientForm.value
        )
      : this.operateService.saveRecipient(this.addRecipientForm.value);

    if (
      this.isEditing &&
      !confirm('Are you sure you want to update this recipient?')
    ) {
      this.isSubmitting = false;
      return;
    }

    method.subscribe(() => {
      this.getRecipients();
     this.isSubmitting = false;
     this.addRecipientForm.reset();
    alert(`Recipient ${action}d successfully`);
    });
  }

   loadAttendanceRecords() {
    this.operateService
      .getRecipientRecordsByDate(this.todayDate)
      .subscribe((records) => {
        this.recipients.forEach((recipient) => {
          const record = records.find(
            (r: any) => r.name === recipient.name
          );
          recipient.todayAvailable = record?.isAvailable || false;
          recipient.hasRecord = !!record;
        });
        this.filteredRecipients = [...this.recipients];
      });
  }


   openAttendanceDialog(recipient: any) {
    if (recipient.hasRecord) return;

    // Set the modal text dynamically
    const confirmTextElement = document.getElementById('confirmText');
    if (confirmTextElement) {
      confirmTextElement.innerText = `Set attendance for ${recipient.name}?`;
    }

    // Get buttons and attach event listeners
    const availableButton = document.getElementById(
      'confirmButton'
    ) as HTMLButtonElement;
    const unavailableButton = document.getElementById(
      'unavailableButton'
    ) as HTMLButtonElement;

    if (availableButton && unavailableButton) {
      availableButton.onclick = () => this.toggleAvailability(recipient, true);
      unavailableButton.onclick = () => this.toggleAvailability(recipient, false);
      console.log('availableButton:', availableButton);
      console.log('unavailableButton:', unavailableButton);
    }
  }
   // Modified toggle method
  toggleAvailability(recipient: any, status: boolean) {
    console.log('toggleAvailability status:', status);
    const record = {
      name: recipient.name,
      date: this.todayDate,
      isAvailable: status,
    };

    this.operateService.addRecipientRecord(record).subscribe(() => {
      recipient.todayAvailable = status;
      recipient.hasRecord = true;
      this.filteredRecipients = [...this.filteredRecipients]; // Trigger change detection
    });
   
    console.log('toggleAvailability status:', status);
  }

 
  editRecipient(recipient: any): void {
    this.isEditing = true;
    this.editedRecipient = recipient;
    this.addRecipientForm.patchValue({
      name: recipient.name,
      contactNumber: recipient.contactNumber,
      address: recipient.address,
      qualification: recipient.qualification,
      startTime: recipient.startTime,
      endTime: recipient.endTime,
      joiningDate: recipient.joiningDate,
      retireDate: recipient.retireDate,
     
      staffImage: recipient.staffImage,
    });
  }
  deleteRecipient(recipient: any): void {
    if (confirm('Are you sure you want to delete this recipient?')) {
      this.operateService.deleteRecipient(recipient.id).subscribe(() => {
        this.getRecipients();
      });
    }
  }
  viewRecipientModal(recipient: any) {
    this.selectedRecipient = recipient;
  }
  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.filteredRecipients = this.recipients.filter((recipient) =>
      recipient.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
