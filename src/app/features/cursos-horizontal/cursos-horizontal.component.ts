import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AppShellComponent, NavItem } from '../../shared/ui/shell/app-shell.component';

@Component({
  selector: 'app-cursos-horizontal',
  standalone: true,
  imports: [AppShellComponent],
  templateUrl: './cursos-horizontal.component.html'
})
export class CursosHorizontalComponent {
  navItems: NavItem[] = [
    { label: 'Mis cursos', path: '/profesor' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get nombreUsuario(): string {
    return this.authService.getUsuarioActual() ?? 'Profesor';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
