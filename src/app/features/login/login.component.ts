import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  password = '';
  errorMessage = '';
  cargando = false;

  private readonly rutaPorRol: Record<string, string> = {
    admin: '/admin',
    profesor: '/profesor',
    alumno: '/alumno'
  };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';
    this.cargando = true;

    this.auth.login(this.usuario, this.password).subscribe({
      next: ({ rol }) => {
        this.cargando = false;
        this.router.navigate([this.rutaPorRol[rol] ?? '/login']);
      },
      error: err => {
        this.cargando = false;
        this.errorMessage = err?.message || 'Error de autenticación';
      }
    });
  }
}
