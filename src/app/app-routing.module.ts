import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',redirectTo: 'user',pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./Modules/user-module/user-module.module').then(
        (m) => m.UserModuleModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
