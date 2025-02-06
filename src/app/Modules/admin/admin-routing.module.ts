import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';

import { PatientComponent } from './patient/patient.component';
import { RecipientComponent } from './recipient/recipient.component';
import { RecipientRecordsComponent } from './recipient-records/recipient-records.component';
import { DoctorRecordsComponent } from './doctor-records/doctor-records.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DoctorComponent,
      },
      {
        path: 'doc-detail',
        component: DoctorComponent,
      },
      {
        path: 'pat-detail',
        component: PatientComponent,
      },
      {
        path: 'recip-detail',
        component: RecipientComponent,
      },
      {
        path: 'recipient-records',
        component: RecipientRecordsComponent,
      },
      {
        path: 'doctor-records',
        component: DoctorRecordsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
