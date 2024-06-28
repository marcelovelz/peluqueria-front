import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientsService } from '../services/clients.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  newClient: Client = {} as Client;
  @ViewChild('content', { static: false })
  createClientModal!: ElementRef;

  constructor(
    private clientService: ClientsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error: any) => {
        console.error('Error loading clients:', error);
      }
    );
  }

  openModal() {
    this.modalService.open(this.createClientModal, { size: 'lg' });
  }

  saveClient(modal: NgbModalRef) {
    this.clientService.createClient(this.newClient).subscribe(
      (response) => {
        console.log('Cliente guardado con éxito:', response);
        this.loadClients();
        modal.close();
      },
      (error) => {
        console.error('Error al guardar el cliente:', error);
      }
    );
  }
}
