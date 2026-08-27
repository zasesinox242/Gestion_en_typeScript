import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../domain/models';
import { API_URL } from '../api-url';

@Injectable({ providedIn: 'root' })
export class AlumnosRepository {
  private readonly base = `${API_URL}/alumnos`;

  constructor(private http: HttpClient) {}

  list(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.base);
  }

  listByCurso(cursoId: number): Observable<Alumno[]> {
    const params = new HttpParams().set('cursoId', cursoId);
    return this.http.get<Alumno[]>(this.base, { params });
  }

  create(alumno: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.http.post<Alumno>(this.base, alumno);
  }

  update(id: number, cambios: Partial<Alumno>): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.base}/${id}`, cambios);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
