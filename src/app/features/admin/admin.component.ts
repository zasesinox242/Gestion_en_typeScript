import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AppShellComponent, NavItem } from '../../shared/ui/shell/app-shell.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AppShellComponent],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  navItems: NavItem[] = [
    { label: 'Resumen', path: '/admin' },
    { label: 'Gestionar cursos', path: '/admin/gestion-cursos' },
    { label: 'Gestionar usuarios', path: '/admin/gestion-usuarios' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get nombreUsuario(): string {
    return this.authService.getUsuarioActual() ?? 'Admin';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
