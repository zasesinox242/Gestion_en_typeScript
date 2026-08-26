import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Rol } from '../../../domain/usuario/usuario.entity';
import { JwtPayload } from './jwt.strategy';

/** Equivalente server-side de tu RoleGuard de Angular. */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesPermitidos = this.reflector.getAllAndOverride<Rol[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!rolesPermitidos || rolesPermitidos.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    const rolActual = request.user?.rol;

    if (!rolActual || !rolesPermitidos.includes(rolActual)) {
      throw new ForbiddenException('No tenés permiso para acceder a este recurso');
    }
    return true;
  }
}
