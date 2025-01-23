import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipientComponent } from './recipient/recipient.component';

const routes: Routes = [ {
      path: '',
      component: RecipientComponent,
    },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
