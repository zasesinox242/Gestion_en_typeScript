import { SetMetadata } from '@nestjs/common';
import { Rol } from '../../domain/usuario.entity';

export const ROLES_KEY = 'roles';

/** Equivalente server-side de `data: { roles: [...] }` en tus rutas de Angular. */
export const Roles = (...roles: Rol[]) => SetMetadata(ROLES_KEY, roles);
