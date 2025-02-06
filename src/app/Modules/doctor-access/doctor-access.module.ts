import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorAccessRoutingModule } from './doctor-access-routing.module';
import { DoctorAccessComponent } from './doctor-access/doctor-access.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DoctorAccessComponent,

  ],
  imports: [
    CommonModule,
    DoctorAccessRoutingModule,
    SharedModule
  ]
})
export class DoctorAccessModule { }
