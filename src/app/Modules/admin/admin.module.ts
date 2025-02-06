import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { DoctorComponent } from "./doctor/doctor.component";
import { PatientComponent } from "./patient/patient.component";
import { RecipientComponent } from "./recipient/recipient.component";
import { RecipientRecordsComponent } from "./recipient-records/recipient-records.component";
import { DoctorRecordsComponent } from "./doctor-records/doctor-records.component";

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    DoctorComponent,
    PatientComponent,
    RecipientComponent,
    RecipientRecordsComponent,
    DoctorRecordsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
