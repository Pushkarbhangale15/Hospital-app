// recipient-records.component.ts
import { Component, OnInit } from '@angular/core';
import { OperateService } from '../../../services/operate.service';

@Component({
  selector: 'app-recipient-records',
  templateUrl: './recipient-records.component.html',
  styleUrls: ['./recipient-records.component.css'],
})
export class RecipientRecordsComponent implements OnInit {
  records: any[] = [];
  filteredRecords: any[] = [];
  selectedDate: string = '';
  searchName: string = '';
  loading: boolean = false;

  constructor(private operateService: OperateService) {}

  ngOnInit(): void {
    this.fetchRecipientRecords();
  }

  fetchRecipientRecords(): void {
    this.loading = true;
    this.operateService.getRecipientRecords().subscribe({
      next: (data) => {
        this.records = data;
        this.filteredRecords = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching recipient records:', error);
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    this.filteredRecords = this.records.filter((record) => {
      const matchesDate =
        !this.selectedDate ||
        new Date(record.date).toISOString().split('T')[0] === this.selectedDate;
      const matchesName =
        !this.searchName ||
        record.name.toLowerCase().includes(this.searchName.toLowerCase());
      return matchesDate && matchesName;
    });
  }

  resetFilters(): void {
    this.selectedDate = '';
    this.searchName = '';
    this.filteredRecords = this.records;
  }
}
