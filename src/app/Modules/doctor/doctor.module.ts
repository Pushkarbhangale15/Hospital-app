import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'; // Importing SharedModule
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorRecordsComponent } from './doctor-records/doctor-records.component';


@NgModule({
  declarations: [
    DoctorComponent,
    DoctorRecordsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DoctorRoutingModule,
    FormsModule,
    SharedModule, // Importing SharedModule to use TimePipe
    
  ]
})
export class DoctorModule { }
