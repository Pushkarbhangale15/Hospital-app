import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'; // Importing SharedModule
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor/doctor.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DoctorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DoctorRoutingModule,
    SharedModule, // Importing SharedModule to use TimePipe
    
  ]
})
export class DoctorModule { }
