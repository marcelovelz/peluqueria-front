import { Appointment } from './appoinment.model';

export interface Service {
  id: number;
  description: string;
  appointmentId: number;
  appointment?: Appointment;
}
