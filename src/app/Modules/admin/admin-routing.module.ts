import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from '../doctor/doctor/doctor.component';

import { PatientComponent } from '../patient/patient/patient.component';
import { RecipientComponent } from '../recipient/recipient/recipient.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
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
        path: 'recep-detail',
        component: RecipientComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
