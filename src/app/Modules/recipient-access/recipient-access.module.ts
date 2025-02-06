import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipientAccessRoutingModule } from './recipient-access-routing.module';
import { RecipientAccessComponent } from './recipient-access/recipient-access.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipientAccessComponent
  ],
  imports: [
    CommonModule,
    RecipientAccessRoutingModule,
    SharedModule
  ]
})
export class RecipientAccessModule { }
