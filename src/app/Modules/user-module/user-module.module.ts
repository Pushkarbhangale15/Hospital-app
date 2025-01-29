import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesiteComponent } from './homesite/homesite.component';
import { UserModuleRoutingModule } from './user-module-routing.module';


@NgModule({
  declarations: [HomesiteComponent],
  imports: [CommonModule, UserModuleRoutingModule],
})
export class UserModuleModule {}
