import { Usuario } from './usuario.entity';

/**
 * Puerto de salida: define QUÉ necesita el dominio de la persistencia,
 * sin decir CÓMO se implementa. La capa infrastructure la implementa con
 * Prisma; el dominio y los casos de uso nunca importan Prisma directamente.
 */
export interface UsuarioRepository {
  listar(): Promise<Usuario[]>;
  buscarPorId(id: number): Promise<Usuario | null>;
  buscarPorNombreUsuario(usuario: string): Promise<Usuario | null>;
  crear(datos: Omit<Usuario, 'id'>): Promise<Usuario>;
  actualizar(id: number, cambios: Partial<Omit<Usuario, 'id'>>): Promise<Usuario>;
  eliminar(id: number): Promise<void>;
}

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');
