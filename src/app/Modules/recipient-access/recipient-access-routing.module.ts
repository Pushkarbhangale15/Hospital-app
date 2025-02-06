import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipientAccessComponent } from './recipient-access/recipient-access.component';
import { AuthGuard } from '../../guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: RecipientAccessComponent,
    canActivate: [AuthGuard],
    data: { role: 'recipient' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientAccessRoutingModule { }
