import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Usuario } from '../domain/models';

/**
 * "Base de datos" en memoria de usuarios. Hoy vive en el navegador;
 * mañana esta clase es la única que tendría que cambiar para hablar
 * con una API real (misma forma pública, otra implementación interna).
 */
@Injectable({ providedIn: 'root' })
export class UsuariosRepository {
  private seed: Usuario[] = [
    { id: 1, usuario: 'admin', password: 'admin123', rol: 'admin' },
    { id: 2, usuario: 'profe', password: 'profe123', rol: 'profesor' },
    { id: 3, usuario: 'alumno', password: 'alumno123', rol: 'alumno' }
  ];

  private usuarios$ = new BehaviorSubject<Usuario[]>(this.seed);
  private nextId = this.seed.length + 1;

  private readonly LATENCY = 250;

  list(): Observable<Usuario[]> {
    return this.usuarios$.pipe(map(list => [...list]), delay(this.LATENCY));
  }

  findByCredentials(usuario: string, password: string): Observable<Usuario | undefined> {
    const found = this.usuarios$.value.find(
      u => u.usuario === usuario && u.password === password
    );
    return of(found).pipe(delay(this.LATENCY));
  }

  create(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    const nuevo: Usuario = { ...usuario, id: this.nextId++ };
    this.usuarios$.next([...this.usuarios$.value, nuevo]);
    return of(nuevo).pipe(delay(this.LATENCY));
  }

  update(id: number, cambios: Partial<Usuario>): Observable<Usuario> {
    const actual = this.usuarios$.value;
    const idx = actual.findIndex(u => u.id === id);
    if (idx === -1) {
      return throwError(() => new Error('Usuario no encontrado'));
    }
    const actualizado = { ...actual[idx], ...cambios, id };
    const copia = [...actual];
    copia[idx] = actualizado;
    this.usuarios$.next(copia);
    return of(actualizado).pipe(delay(this.LATENCY));
  }

  delete(id: number): Observable<void> {
    this.usuarios$.next(this.usuarios$.value.filter(u => u.id !== id));
    return of(void 0).pipe(delay(this.LATENCY));
  }
}
