import { Inject, Injectable } from '@nestjs/common';
import { Alumno } from '../../domain/alumno/alumno.entity';
import { ALUMNO_REPOSITORY, AlumnoRepository } from '../../domain/alumno/alumno.repository';

@Injectable()
export class AlumnosService {
  constructor(@Inject(ALUMNO_REPOSITORY) private readonly alumnoRepo: AlumnoRepository) {}

  listarTodos(): Promise<Alumno[]> {
    return this.alumnoRepo.listar();
  }

  listarPorCurso(cursoId: number): Promise<Alumno[]> {
    return this.alumnoRepo.listarPorCurso(cursoId);
  }

  crear(datos: Omit<Alumno, 'id'>): Promise<Alumno> {
    return this.alumnoRepo.crear(datos);
  }

  actualizar(id: number, cambios: Partial<Omit<Alumno, 'id'>>): Promise<Alumno> {
    return this.alumnoRepo.actualizar(id, cambios);
  }

  eliminar(id: number): Promise<void> {
    return this.alumnoRepo.eliminar(id);
  }
}
