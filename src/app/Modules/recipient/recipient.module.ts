import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipientRoutingModule } from './recipient-routing.module';
import { RecipientComponent } from './recipient/recipient.component';
import { SharedModule } from '../shared/shared.module';
import { RecipientRecordsComponent } from './recipient-records/recipient-records.component'; // Importing SharedModule

@NgModule({
  declarations: [
    RecipientComponent,
    RecipientRecordsComponent
  ],
  imports: [
    CommonModule,
    RecipientRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule // Importing SharedModule to use TimePipe

  ]
})
export class RecipientModule { }
