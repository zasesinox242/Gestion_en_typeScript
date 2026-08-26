import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnosRepository } from '../data/alumnos.repository';
import { Alumno } from '../domain/models';

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  constructor(private repo: AlumnosRepository) {}

  listarPorCurso(cursoId: number): Observable<Alumno[]> {
    return this.repo.listByCurso(cursoId);
  }

  listarTodos(): Observable<Alumno[]> {
    return this.repo.list();
  }

  crear(datos: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.repo.create(datos);
  }

  actualizar(id: number, cambios: Partial<Alumno>): Observable<Alumno> {
    return this.repo.update(id, cambios);
  }

  eliminar(id: number): Observable<void> {
    return this.repo.delete(id);
  }
}
