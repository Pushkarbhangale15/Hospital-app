// doctor-records.component.ts
import { Component, OnInit } from '@angular/core';
import { OperateService } from '../../../services/operate.service';

@Component({
  selector: 'app-doctor-records',
  templateUrl: './doctor-records.component.html',
  styleUrls: ['./doctor-records.component.css'],
})
export class DoctorRecordsComponent implements OnInit {
  records: any[] = [];
  filteredRecords: any[] = [];
  selectedDate: string = '';
  searchName: string = '';
  loading: boolean = false;

  constructor(private operateService: OperateService) {}

  ngOnInit(): void {
    this.fetchDoctorRecords();
  }

  fetchDoctorRecords(): void {
    this.loading = true;
    this.operateService.getDoctorRecords().subscribe({
      next: (data) => {
        this.records = data;
        this.filteredRecords = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching records:', error);
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    this.filteredRecords = this.records.filter((record) => {
      const matchesDate =
        !this.selectedDate || record.date.split('T')[0] === this.selectedDate;
      const matchesName =
        !this.searchName ||
        record.doctorName.toLowerCase().includes(this.searchName.toLowerCase());
      return matchesDate && matchesName;
    });
  }

  resetFilters(): void {
    this.selectedDate = '';
    this.searchName = '';
    this.filteredRecords = this.records;
  }

  exportRecords(): void {
    // Implement export functionality
    console.log('Exporting records...');
  }
}
