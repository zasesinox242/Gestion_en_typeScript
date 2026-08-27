import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../domain/models';
import { API_URL } from '../api-url';

@Injectable({ providedIn: 'root' })
export class CursosRepository {
  private readonly base = `${API_URL}/cursos`;

  constructor(private http: HttpClient) {}

  list(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.base);
  }

  getById(id: number): Observable<Curso | undefined> {
    return this.http.get<Curso>(`${this.base}/${id}`);
  }

  create(curso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.http.post<Curso>(this.base, curso);
  }

  update(id: number, cambios: Partial<Curso>): Observable<Curso> {
    return this.http.put<Curso>(`${this.base}/${id}`, cambios);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
