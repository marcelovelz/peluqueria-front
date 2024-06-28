import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service.model';
import { environment } from 'src/app/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  getServicesByAppointment(appointmentId: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services/${appointmentId}`);
  }

  createService(serviceData: Partial<Service>): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrl}/services`, serviceData);
  }
}
