import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../domain/models';
import { API_URL } from '../api-url';

@Injectable({ providedIn: 'root' })
export class UsuariosRepository {
  private readonly base = `${API_URL}/usuarios`;

  constructor(private http: HttpClient) {}

  // Nota: el backend nunca devuelve el hash de password (usa UsuarioSinPassword
  // internamente), por eso list()/create()/update() reciben objetos sin ese campo
  // aunque el tipo Usuario lo declare — nada en la UI lee `.password` de un
  // usuario ya listado, solo lo usa para escribir el formulario de alta.
  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.base);
  }

  create(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.base, usuario);
  }

  update(id: number, cambios: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.base}/${id}`, cambios);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
