import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/enviroment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  regUsername: string = '';
  regPassword: string = '';
  @ViewChild('registroModal', { static: false }) registroModal!: ElementRef;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) {}

  login(): void {
    this.http
      .post<any>(`${this.apiUrl}/users/login`, {
        username: this.username,
        password: this.password,
      })
      .subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/clients']);
        },
        (error) => {
          alert('Usuario o contraseña incorrectos');
        }
      );
  }

  openModal() {
    this.modalService.open(this.registroModal, { size: 'lg' });
  }

  register(modal: any) {
    if(!this.validateForm()) return alert('Por favor, llene todos los campos');
    this.http
      .post<any>(`${this.apiUrl}/users/register`, {
        username: this.regUsername,
        password: this.regPassword,
        role: 'user',
      })
      .subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
        },
        (error) => {
          console.error('Error en registro:', error);
        }
      );
    modal.close();
  }

  validateForm(): boolean {
    return this.regUsername.length > 0 && this.regPassword.length > 0;
  }
}
