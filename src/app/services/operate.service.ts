import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperateService {
  private dbUrl = 'http://localhost:3000/doctors';

  constructor(private http: HttpClient) {}

  saveDoctorData(doctorData: any): Observable<any> {
    return this.http.post(this.dbUrl, doctorData);
  }

  getAllDoctors(): Observable<any> {
    return this.http.get(this.dbUrl);
  }

  updateDoctor(id: string, doctor: any): any {
    return this.http.put(`${this.dbUrl}/${id}`, doctor);
  }

  deleteDoctor(id: string): any {
    return this.http.delete(`${this.dbUrl}/${id}`);
  }
}
