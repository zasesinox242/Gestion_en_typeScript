import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowedRoles: string[] = route.data['roles'];
    const userRole = this.auth.getRole();

    // si no autenticado -> redirigir a login
    if (!userRole) {
      return this.router.parseUrl('/login');
    }

    // si roles no definidos en la ruta, permitir (o ajustar según política)
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    // comprobar permiso
    if (allowedRoles.includes(userRole)) {
      return true;
    }

    // si no tiene permiso, redirigir al dashboard principal o login
    return this.router.parseUrl('/login');
  }
}
