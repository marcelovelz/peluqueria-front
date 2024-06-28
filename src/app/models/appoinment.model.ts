import { Client } from './client.model';

export interface Appointment {
  id: number;
  date: Date;
  clientId: number;
  client?: Client;
}
