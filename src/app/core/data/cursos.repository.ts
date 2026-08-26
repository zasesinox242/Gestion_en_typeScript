import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Curso } from '../domain/models';

@Injectable({ providedIn: 'root' })
export class CursosRepository {
  private seed: Curso[] = [
    { id: 1, nombre: 'Álgebra' },
    { id: 2, nombre: 'Comunicación' }
  ];

  private cursos$ = new BehaviorSubject<Curso[]>(this.seed);
  private nextId = this.seed.length + 1;
  private readonly LATENCY = 200;

  list(): Observable<Curso[]> {
    return this.cursos$.pipe(map(list => [...list]), delay(this.LATENCY));
  }

  getById(id: number): Observable<Curso | undefined> {
    return of(this.cursos$.value.find(c => c.id === id)).pipe(delay(this.LATENCY));
  }

  create(curso: Omit<Curso, 'id'>): Observable<Curso> {
    const nuevo: Curso = { ...curso, id: this.nextId++ };
    this.cursos$.next([...this.cursos$.value, nuevo]);
    return of(nuevo).pipe(delay(this.LATENCY));
  }

  update(id: number, cambios: Partial<Curso>): Observable<Curso> {
    const actual = this.cursos$.value;
    const idx = actual.findIndex(c => c.id === id);
    if (idx === -1) {
      return throwError(() => new Error('Curso no encontrado'));
    }
    const actualizado = { ...actual[idx], ...cambios, id };
    const copia = [...actual];
    copia[idx] = actualizado;
    this.cursos$.next(copia);
    return of(actualizado).pipe(delay(this.LATENCY));
  }

  delete(id: number): Observable<void> {
    this.cursos$.next(this.cursos$.value.filter(c => c.id !== id));
    return of(void 0).pipe(delay(this.LATENCY));
  }
}
