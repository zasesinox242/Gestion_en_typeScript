export type Rol = 'admin' | 'profesor' | 'alumno';

export interface Usuario {
  id: number;
  usuario: string;
  rol: Rol;
}
