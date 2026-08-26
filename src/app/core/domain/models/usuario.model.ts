export type Rol = 'admin' | 'profesor' | 'alumno';

/**
 * Representa una cuenta del sistema. `password` solo debe ser usado
 * dentro de la capa de datos (repositorios); las vistas no deberían
 * necesitar leerlo directamente.
 */
export interface Usuario {
  id: number;
  usuario: string;
  password: string;
  rol: Rol;
}

export const ROLES_LABEL: Record<Rol, string> = {
  admin: 'Administrador',
  profesor: 'Profesor',
  alumno: 'Alumno'
};
