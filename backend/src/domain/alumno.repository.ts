import { Alumno } from './alumno.entity';

export interface AlumnoRepository {
  listar(): Promise<Alumno[]>;
  listarPorCurso(cursoId: number): Promise<Alumno[]>;
  buscarPorId(id: number): Promise<Alumno | null>;
  crear(datos: Omit<Alumno, 'id'>): Promise<Alumno>;
  actualizar(id: number, cambios: Partial<Omit<Alumno, 'id'>>): Promise<Alumno>;
  eliminar(id: number): Promise<void>;
}

export const ALUMNO_REPOSITORY = Symbol('ALUMNO_REPOSITORY');
