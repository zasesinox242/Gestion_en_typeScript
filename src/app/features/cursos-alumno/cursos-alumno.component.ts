import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AppShellComponent, NavItem } from '../../shared/ui/shell/app-shell.component';

@Component({
  selector: 'app-cursos-alumno',
  standalone: true,
  imports: [AppShellComponent],
  templateUrl: './cursos-alumno.component.html'
})
export class CursosAlumnoComponent {
  navItems: NavItem[] = [
    { label: 'Mis cursos', path: '/alumno' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get nombreUsuario(): string {
    return this.authService.getUsuarioActual() ?? 'Alumno';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
