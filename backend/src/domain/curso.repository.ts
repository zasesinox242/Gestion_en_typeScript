import { Curso } from './curso.entity';

export interface CursoRepository {
  listar(): Promise<Curso[]>;
  buscarPorId(id: number): Promise<Curso | null>;
  crear(datos: Omit<Curso, 'id'>): Promise<Curso>;
  actualizar(id: number, cambios: Partial<Omit<Curso, 'id'>>): Promise<Curso>;
  eliminar(id: number): Promise<void>;
}

export const CURSO_REPOSITORY = Symbol('CURSO_REPOSITORY');
