import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Nota } from '../domain/models';

@Injectable({ providedIn: 'root' })
export class NotasRepository {
  private seed: Nota[] = [
    { alumnoId: 1, cursoId: 1, valor: 18 },
    { alumnoId: 2, cursoId: 1, valor: 19 },
    { alumnoId: 3, cursoId: 1, valor: 16 },
    { alumnoId: 1, cursoId: 2, valor: 17 },
    { alumnoId: 3, cursoId: 2, valor: 15 },
    { alumnoId: 4, cursoId: 2, valor: 14 }
  ];

  private notas$ = new BehaviorSubject<Nota[]>(this.seed);
  private readonly LATENCY = 200;

  listByCurso(cursoId: number): Observable<Nota[]> {
    return this.notas$.pipe(
      map(list => list.filter(n => n.cursoId === cursoId)),
      delay(this.LATENCY)
    );
  }

  upsert(nota: Nota): Observable<Nota> {
    const actual = this.notas$.value;
    const idx = actual.findIndex(
      n => n.alumnoId === nota.alumnoId && n.cursoId === nota.cursoId
    );
    const copia = [...actual];
    if (idx === -1) {
      copia.push(nota);
    } else {
      copia[idx] = nota;
    }
    this.notas$.next(copia);
    return of(nota).pipe(delay(this.LATENCY));
  }
}
