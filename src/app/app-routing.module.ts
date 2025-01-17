import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorRoutingModule } from './Modules/doctor/doctor-routing.module';

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
