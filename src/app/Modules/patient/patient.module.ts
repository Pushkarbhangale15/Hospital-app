import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient/patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'; // Importing SharedModule

@NgModule({
  declarations: [PatientComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule, // Importing SharedModule to use TimePipe
  ],
  exports: [PatientComponent], // Exporting PatientComponent
})
export class PatientModule {}
