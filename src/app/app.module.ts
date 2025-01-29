import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorModule } from './Modules/doctor/doctor.module';
import { PatientModule } from './Modules/patient/patient.module';
import { RecipientModule } from './Modules/recipient/recipient.module';
import { SharedModule } from './Modules/shared/shared.module'; // Import SharedModule
import { UserModuleModule } from './Modules/user-module/user-module.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoctorModule,
    PatientModule,
    RecipientModule,
    SharedModule,
    UserModuleModule, // Add SharedModule here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
