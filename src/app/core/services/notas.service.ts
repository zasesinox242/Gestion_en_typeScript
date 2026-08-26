import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { NotasRepository } from '../data/notas.repository';
import { AlumnosRepository } from '../data/alumnos.repository';
import { Nota } from '../domain/models';

export interface AlumnoConNota {
  alumnoId: number;
  nombres: string;
  apellidos: string;
  nota: number | null;
}

@Injectable({ providedIn: 'root' })
export class NotasService {
  constructor(
    private notasRepo: NotasRepository,
    private alumnosRepo: AlumnosRepository
  ) {}

  listarPorCurso(cursoId: number): Observable<AlumnoConNota[]> {
    return combineLatest([
      this.alumnosRepo.listByCurso(cursoId),
      this.notasRepo.listByCurso(cursoId)
    ]).pipe(
      map(([alumnos, notas]) =>
        alumnos.map(a => {
          const nota = notas.find(n => n.alumnoId === a.id);
          return {
            alumnoId: a.id,
            nombres: a.nombres,
            apellidos: a.apellidos,
            nota: nota ? nota.valor : null
          };
        })
      )
    );
  }

  guardarNota(cursoId: number, alumnoId: number, valor: number): Observable<Nota> {
    return this.notasRepo.upsert({ alumnoId, cursoId, valor });
  }
}
