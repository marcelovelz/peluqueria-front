import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/enviroment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

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
          console.error('Error en inicio de sesión:', error);
        }
      );
  }
}
