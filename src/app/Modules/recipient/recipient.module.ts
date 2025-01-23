import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './recipient-routing.module';
import { RecipientComponent } from './recipient/recipient.component';


@NgModule({
  declarations: [
    RecipientComponent
  ],
  imports: [
    CommonModule,
    ReceptionRoutingModule
  ]
})
export class ReceptionModule { }
