import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './Modules/shared/shared.module'; // Import SharedModule
import { UserModuleModule } from './Modules/user-module/user-module.module'
import { HttpClientModule } from '@angular/common/http';
import { DoctorAccessModule } from './Modules/doctor-access/doctor-access.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoctorAccessModule,
    SharedModule,
    UserModuleModule, // Add SharedModule here
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
