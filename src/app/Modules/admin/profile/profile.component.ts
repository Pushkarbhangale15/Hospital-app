import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperateService } from '../../../services/operate.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  adminData: any;
  loading = true;
  error: string | null = null;

  constructor(private operateService: OperateService) { }

  ngOnInit(): void {
    this.operateService.fetchAdminProfile().subscribe({
      next: (data:any) => {
        this.adminData = data;
        this.loading = false;
      },
      error: (err:any) => {
        this.error = 'Failed to load admin profile';
        this.loading = false;
        console.error(err);
      },
    });
}
}