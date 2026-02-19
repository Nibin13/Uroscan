import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // 🔐 LOGIN
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // 📤 Upload Scan (Technician)
  uploadScan(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload_scan`, formData);
  }

  // 👨‍⚕️ Get scans for doctor
  getDoctorScans(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctor_scans/${doctorId}`);
  }

  // ✅ Update scan status
  updateScan(scanId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/update_scan/${scanId}`, formData);
  }
}
