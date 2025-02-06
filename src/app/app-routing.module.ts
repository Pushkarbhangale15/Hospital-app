import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
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
    path: 'doctor-access',
    loadChildren: () =>
      import('./Modules/doctor-access/doctor-access.module').then(
        (m) => m.DoctorAccessModule
      ),
  },
  {
    path: 'recipient-access',
    loadChildren: () =>
      import('./Modules/recipient-access/recipient-access.module').then(
        (m) => m.RecipientAccessModule
      ),
  },
  
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
