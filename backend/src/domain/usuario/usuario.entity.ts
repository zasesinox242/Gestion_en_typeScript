export type Rol = 'admin' | 'profesor' | 'alumno';

/**
 * Entidad de dominio pura. No sabe nada de HTTP ni de Prisma.
 * `password` viaja como hash siempre que sale de la capa de datos.
 */
export interface Usuario {
  id: number;
  usuario: string;
  password: string;
  rol: Rol;
}

export type UsuarioSinPassword = Omit<Usuario, 'password'>;
