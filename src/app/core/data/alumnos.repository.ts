import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Alumno } from '../domain/models';

@Injectable({ providedIn: 'root' })
export class AlumnosRepository {
  private seed: Alumno[] = [
    { id: 1, nombres: 'Valeria', apellidos: 'Montoya Ríos', edad: 13, cursosIds: [1, 2] },
    { id: 2, nombres: 'Andrés Marcos', apellidos: 'Paredes Salazar', edad: 14, cursosIds: [1] },
    { id: 3, nombres: 'Luciana', apellidos: 'Herrera Campos', edad: 12, cursosIds: [1, 2] },
    { id: 4, nombres: 'Diego Franco', apellidos: 'Quispe López', edad: 13, cursosIds: [2] }
  ];

  private alumnos$ = new BehaviorSubject<Alumno[]>(this.seed);
  private nextId = this.seed.length + 1;
  private readonly LATENCY = 200;

  list(): Observable<Alumno[]> {
    return this.alumnos$.pipe(map(list => [...list]), delay(this.LATENCY));
  }

  listByCurso(cursoId: number): Observable<Alumno[]> {
    return this.alumnos$.pipe(
      map(list => list.filter(a => a.cursosIds.includes(cursoId))),
      delay(this.LATENCY)
    );
  }

  create(alumno: Omit<Alumno, 'id'>): Observable<Alumno> {
    const nuevo: Alumno = { ...alumno, id: this.nextId++ };
    this.alumnos$.next([...this.alumnos$.value, nuevo]);
    return of(nuevo).pipe(delay(this.LATENCY));
  }

  update(id: number, cambios: Partial<Alumno>): Observable<Alumno> {
    const actual = this.alumnos$.value;
    const idx = actual.findIndex(a => a.id === id);
    if (idx === -1) {
      return throwError(() => new Error('Alumno no encontrado'));
    }
    const actualizado = { ...actual[idx], ...cambios, id };
    const copia = [...actual];
    copia[idx] = actualizado;
    this.alumnos$.next(copia);
    return of(actualizado).pipe(delay(this.LATENCY));
  }

  delete(id: number): Observable<void> {
    this.alumnos$.next(this.alumnos$.value.filter(a => a.id !== id));
    return of(void 0).pipe(delay(this.LATENCY));
  }
}
