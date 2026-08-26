import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Rol } from '../../../core/domain/models';
import { AppShellComponent, NavItem } from '../shell/app-shell.component';

/**
 * Página "shell" genérica para cualquier rol autenticado (admin, profesor,
 * alumno). Reemplaza a los antiguos AdminComponent / CursosHorizontalComponent /
 * CursosAlumnoComponent, que eran idénticos entre sí salvo por `rol` y
 * `navItems`. Esos dos valores ahora viven en `route.data.shell`, junto a la
 * definición de la ruta, en vez de duplicados en un componente por rol.
 */
@Component({
  selector: 'app-role-page',
  standalone: true,
  imports: [AppShellComponent],
  templateUrl: './role-page.component.html'
})
export class RolePageComponent {
  readonly rol: Rol;
  readonly navItems: NavItem[];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    const shell = this.route.snapshot.data['shell'] as { rol: Rol; navItems: NavItem[] };
    this.rol = shell.rol;
    this.navItems = shell.navItems;
  }

  get nombreUsuario(): string {
    return this.authService.getUsuarioActual() ?? this.rol;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
