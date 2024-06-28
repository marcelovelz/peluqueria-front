import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onClientsClick(): void {
    this.router.navigate(['/clients']);
  }

  onAppointmentsClick(): void {
    this.router.navigate(['/appointments']);
  }

  onServicesClick(): void {
    this.router.navigate(['/services']);
  }
}
