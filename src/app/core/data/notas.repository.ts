import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from '../domain/models';
import { API_URL } from '../api-url';

@Injectable({ providedIn: 'root' })
export class NotasRepository {
  private readonly base = `${API_URL}/notas`;

  constructor(private http: HttpClient) {}

  listByCurso(cursoId: number): Observable<Nota[]> {
    const params = new HttpParams().set('cursoId', cursoId);
    return this.http.get<Nota[]>(this.base, { params });
  }

  // El backend hace upsert vía POST /notas (registrar), tanto para crear como actualizar.
  upsert(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.base, nota);
  }
}
