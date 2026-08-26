import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursosRepository } from '../data/cursos.repository';
import { Curso } from '../domain/models';

@Injectable({ providedIn: 'root' })
export class CursosService {
  constructor(private repo: CursosRepository) {}

  listar(): Observable<Curso[]> {
    return this.repo.list();
  }

  obtener(id: number): Observable<Curso | undefined> {
    return this.repo.getById(id);
  }

  crear(nombre: string): Observable<Curso> {
    return this.repo.create({ nombre });
  }

  actualizar(id: number, nombre: string): Observable<Curso> {
    return this.repo.update(id, { nombre });
  }

  eliminar(id: number): Observable<void> {
    return this.repo.delete(id);
  }
}
