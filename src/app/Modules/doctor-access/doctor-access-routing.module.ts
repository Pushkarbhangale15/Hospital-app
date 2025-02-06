import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAccessComponent } from './doctor-access/doctor-access.component';
import { AuthGuard } from '../../guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: DoctorAccessComponent,
    canActivate: [AuthGuard],
    data: { role: 'doctor' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorAccessRoutingModule { }
