import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomesiteComponent } from './homesite/homesite.component';

const routes: Routes = [
  {
    path: '',
    component: HomesiteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
