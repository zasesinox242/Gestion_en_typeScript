import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Rol } from '../domain/models';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const rolesPermitidos: Rol[] | undefined = route.data['roles'];
    const rolActual = this.auth.getRol();

    if (!rolActual) {
      return this.router.parseUrl('/login');
    }

    if (!rolesPermitidos || rolesPermitidos.length === 0) {
      return true;
    }

    if (rolesPermitidos.includes(rolActual)) {
      return true;
    }

    return this.router.parseUrl('/login');
  }
}
