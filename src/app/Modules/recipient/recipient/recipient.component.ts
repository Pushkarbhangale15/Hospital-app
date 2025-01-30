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
    private operatorService: OperateService,
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
        isAvailable: [false],
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
    this.operatorService.getAllRecipients().subscribe((recipients: any) => {
      console.log(recipients);
      this.recipients = recipients;
      this.filteredRecipients = this.recipients;
    });
  }
  closeModal() {
    const fileStaffInput = document.getElementById(
      'staffImage'
    ) as HTMLInputElement;
    if (fileStaffInput) {
      fileStaffInput.value = '';
    }
    this.isEditing = false;
    this.addRecipientForm.reset();
  }
  // In RecipientComponent
  onSubmit(): void {
    this.isSubmitting = true;
    const action = this.isEditing ? 'update' : 'save';
    const method = this.isEditing
      ? this.operatorService.updateRecipient(
          this.editedRecipient.id,
          this.addRecipientForm.value
        )
      : this.operatorService.saveRecipient(this.addRecipientForm.value);

    if (
      this.isEditing &&
      !confirm('Are you sure you want to update this recipient?')
    ) {
      this.isSubmitting = false;
      return;
    }

    method.subscribe(() => {
      this.getRecipients();
      const recipientName = this.addRecipientForm.value.name;
      const today = this.todayDate;
      const isAvailable = this.addRecipientForm.value.isAvailable;

      // Check for existing attendance record
      this.operatorService
        .getRecipientRecordByNameAndDate(recipientName, today)
        .subscribe((records) => {
          if (records.length > 0) {
            // Update existing record
            const record = records[0];
            record.isAvailable = isAvailable;
            this.operatorService
              .updateRecipientRecord(record.id, record)
              .subscribe(() => {
                console.log('Recipient attendance record updated');
              });
          } else {
            // Create new record
            const recipientRecord = {
              name: recipientName,
              date: today,
              isAvailable: isAvailable,
            };
            this.operatorService
              .addRecipientRecord(recipientRecord)
              .subscribe(() => {
                console.log('Recipient attendance record added');
              });
          }
        });

      this.isSubmitting = false;
      this.addRecipientForm.reset();
      alert(`Recipient ${action}d successfully`);
    });
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
      isAvailable: recipient.isAvailable,
      staffImage: recipient.staffImage,
    });
  }
  deleteRecipient(recipient: any): void {
    if (confirm('Are you sure you want to delete this recipient?')) {
      this.operatorService.deleteRecipient(recipient.id).subscribe(() => {
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
