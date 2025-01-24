import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperateService {
  private dbUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  saveDoctorData(doctorData: any): Observable<any> {
    return this.http.post(this.dbUrl+'/doctors', doctorData);
  }

  getAllDoctors(): Observable<any> {
    return this.http.get(this.dbUrl+'/doctors');
  }

  updateDoctor(id: string, doctor: any): any {
    return this.http.put(`${this.dbUrl+'/doctors'}/${id}`, doctor);
  }

  deleteDoctor(id: string): any {
    return this.http.delete(`${this.dbUrl+'/doctors'}/${id}`);
  }

  // Now for the Patients
  savePatientData(patientData: any): Observable<any> {
    return this.http.post(this.dbUrl+'/patients', patientData);
  } 
  getAllPatients(): Observable<any> {
    return this.http.get(this.dbUrl+'/patients');
  }
  updatePatient(id: string, patient: any): any {
    return this.http.put(`${this.dbUrl+'/patients'}/${id}`, patient);
  }
  deletePatient(id: string): any {
    return this.http.delete(`${this.dbUrl+'/patients'}/${id}`);
  }
  
}
