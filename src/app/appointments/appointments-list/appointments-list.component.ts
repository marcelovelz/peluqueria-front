import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from '../services/appointments.service';
import { Appointment } from 'src/app/models/appoinment.model';
import { Client } from 'src/app/models/client.model';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services/services.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss'],
})
export class AppointmentsListComponent implements OnInit {
  appointments: Appointment[] = [];
  clients: Client[] = [];
  filteredAppointments: Appointment[] = [];
  newAppointment: Partial<Appointment> = {};
  modalRef!: NgbModalRef;
  filterClientName: string = '';
  selectedAppointment: Appointment | null = null;
  newService: Partial<Service> = {};
  appointmentServices: Service[] = [];

  @ViewChild('servicesModal') servicesModal!: TemplateRef<any>;

  @ViewChild('content') content!: TemplateRef<any>;

  constructor(
    private appointmentsService: AppointmentsService,
    private modalService: NgbModal,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadClients();
  }

  loadAppointments(): void {
    this.appointmentsService.getAppointments().subscribe((data) => {
      this.appointments = data;
      this.filteredAppointments = this.appointments;
    });
  }

  loadClients(): void {
    this.appointmentsService.getClients().subscribe((data) => {
      this.clients = data;
    });
  }

  openModal(): void {
    this.modalRef = this.modalService.open(this.content, { size: 'lg' });
  }

  validateAppointment(): boolean {
    return (
      this.newAppointment.clientId !== undefined &&
      this.newAppointment.date !== undefined
    );
  }

  saveAppointment(): void {
    if (!this.validateAppointment()) {
      return alert('Por favor, llene todos los campos');
    }
    this.appointmentsService
      .createAppointment(this.newAppointment)
      .subscribe(() => {
        this.loadAppointments();
        this.modalRef.close();
        this.newAppointment = {};
      });
  }

  applyFilter(): void {
    const filterValue = this.filterClientName.toLowerCase().trim();

    if (filterValue) {
      this.filteredAppointments = this.appointments.filter(
        (appointment) =>
          appointment.client?.name.toLowerCase().includes(filterValue) ||
          appointment.client?.lastName.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredAppointments = this.appointments;
    }
  }

  viewServices(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.loadAppointmentServices(appointment.id);
    this.modalRef = this.modalService.open(this.servicesModal, { size: 'lg' });
  }

  loadAppointmentServices(appointmentId: number): void {
    this.servicesService
      .getServicesByAppointment(appointmentId)
      .subscribe((data) => {
        this.appointmentServices = data;
      });
  }

  validateService(): boolean {
    return this.newService.description !== undefined;
  }

  saveService(): void {
    if (!this.validateService()) {
      return alert('Por favor, llene todos los campos');
    }
    if (this.selectedAppointment) {
      const serviceData: Partial<Service> = {
        description: this.newService.description,
        appointmentId: this.selectedAppointment.id,
      };

      this.servicesService.createService(serviceData).subscribe(() => {
        this.loadAppointmentServices(this.selectedAppointment!.id);
        this.newService = {};
      });
    }
  }
}
