import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./Modules/user-module/user-module.module').then(
        (m) => m.UserModuleModule
      ),
  },
  {
    path: 'admin',

    loadChildren: () =>
      import('./Modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'doctor',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./Modules/doctor/doctor-routing.module').then(
        (m) => m.DoctorRoutingModule
      ),
  },
  {
    path: 'patient',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./Modules/patient/patient-routing.module').then(
        (m) => m.PatientRoutingModule
      ),
  },
  {
    path: 'reception',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./Modules/reception/reception-routing.module').then(
        (m) => m.ReceptionRoutingModule
      ),
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
   
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
