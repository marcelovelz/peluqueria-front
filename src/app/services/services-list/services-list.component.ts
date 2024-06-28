import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent implements OnInit {
  services: Service[] = [];

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.loadAllServices();
  }

  loadAllServices(): void {
    this.servicesService.getAllServices().subscribe((data) => {
      this.services = data;
    });
  }
}
