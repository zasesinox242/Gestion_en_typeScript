import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
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

  constructor(private auth: AuthService, private router: Router) {}

onLogin(): void {
  this.errorMessage = '';

  this.auth.login(this.usuario, this.password).subscribe({
    next: ({ role }) => {

      if (role === 'admin') {
        this.router.navigate(['/admin']);
        return;
      }

      if (role === 'profesor') {
        this.router.navigate(['/cursos-profesor']);
        return;
      }

      if (role === 'alumno') {
        this.router.navigate(['/cursos-alumno']);
        return;
      }

      this.router.navigate(['/login']);
    },
    error: err => {
      this.errorMessage = err?.message || 'Error de autenticación';
    }
  });
}



}
