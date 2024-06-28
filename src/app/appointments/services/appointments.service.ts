import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appoinment.model';
import { Client } from 'src/app/models/client.model';
import { environment } from 'src/app/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments`);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  createAppointment(
    appointment: Partial<Appointment>
  ): Observable<Appointment> {
    return this.http.post<Appointment>(
      `${this.apiUrl}/appointments`,
      appointment
    );
  }
}
