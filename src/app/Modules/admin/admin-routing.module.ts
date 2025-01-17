import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'doctor',
        loadChildren: () =>
          import('../doctor/doctor-routing.module').then(
            (m) => m.DoctorRoutingModule
          ),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('../patient/patient-routing.module').then(
            (m) => m.PatientRoutingModule
          ),
      },
      {
        path: 'reception',
        loadChildren: () =>
          import('../reception/reception-routing.module').then(
            (m) => m.ReceptionRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
