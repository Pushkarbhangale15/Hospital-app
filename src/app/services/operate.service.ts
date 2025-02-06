import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperateService {
  private dbUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // For the Doctors
  saveDoctorData(doctorData: any): Observable<any> {
    return this.http.post(this.dbUrl + '/doctors', doctorData);
  }

  getAllDoctors(): Observable<any> {
    return this.http.get(this.dbUrl + '/doctors');
  }

  updateDoctor(id: string, doctor: any): any {
    return this.http.put(`${this.dbUrl + '/doctors'}/${id}`, doctor);
  }

  deleteDoctor(id: string): any {
    return this.http.delete(`${this.dbUrl + '/doctors'}/${id}`);
  }

  // Now for the Patients
  savePatientData(patientData: any): Observable<any> {
    return this.http.post(this.dbUrl + '/patients', patientData);
  }
  getAllPatients(): Observable<any> {
    return this.http.get(this.dbUrl + '/patients');
  }
  updatePatient(id: string, patient: any): any {
    return this.http.put(`${this.dbUrl + '/patients'}/${id}`, patient);
  }
  deletePatient(id: string): any {
    return this.http.delete(`${this.dbUrl + '/patients'}/${id}`);
  }

  // Now for the Recipients
  getAllRecipients(): any {
    return this.http.get(this.dbUrl + '/recipients');
  }

  saveRecipient(recipient: any): any {
    return this.http.post(this.dbUrl + '/recipients', recipient);
  }

  updateRecipient(id: number, recipient: any): any {
    return this.http.put(`${this.dbUrl + '/recipients'}/${id}`, recipient);
  }

  deleteRecipient(id: number): any {
    return this.http.delete(`${this.dbUrl + '/recipients'}/${id}`);
  }

  // Add the new methods
  getDoctorRecords(): Observable<any> {
    return this.http.get(this.dbUrl + '/doctorRecords');
  }

  getRecipientRecords(): Observable<any> {
    return this.http.get(this.dbUrl + '/recipientRecords');
  }

  addDoctorRecord(doctorRecord: any): Observable<any> {
    return this.http.post(this.dbUrl + '/doctorRecords', doctorRecord);
  }

  addRecipientRecord(recipientRecord: any): Observable<any> {
    return this.http.post(this.dbUrl + '/recipientRecords', recipientRecord);
  }

  // In OperateService
  getRecipientRecordsByDate(date: string): Observable<any> {
    return this.http.get(`${this.dbUrl}/recipientRecords?date=${date}`);
  }

  getDoctorRecordsByDate(date: string): Observable<any> {
    return this.http.get(`${this.dbUrl}/doctorRecords?date=${date}`);
  }

  // For admin profile 
  fetchAdminProfile(): Observable<any> {
    
    return this.http.get(this.dbUrl + '/adminProfile');
  }
  
}
