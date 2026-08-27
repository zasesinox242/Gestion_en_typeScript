import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Rol } from '../domain/models';
import { API_URL } from '../api-url';

export interface SesionActiva {
  token: string;
  rol: Rol;
  usuario: string;
}

const TOKEN_KEY = 'token';
const ROL_KEY = 'role';
const USUARIO_KEY = 'usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<SesionActiva> {
    return this.http.post<SesionActiva>(`${API_URL}/auth/login`, { usuario, password }).pipe(
      tap((sesion) => {
        localStorage.setItem(TOKEN_KEY, sesion.token);
        localStorage.setItem(ROL_KEY, sesion.rol);
        localStorage.setItem(USUARIO_KEY, sesion.usuario);
      }),
      catchError((err: HttpErrorResponse) => {
        const mensaje = err.error?.message || 'Usuario o contraseña incorrectos';
        return throwError(() => ({ message: mensaje }));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROL_KEY);
    localStorage.removeItem(USUARIO_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getRol(): Rol | null {
    return localStorage.getItem(ROL_KEY) as Rol | null;
  }

  getUsuarioActual(): string | null {
    return localStorage.getItem(USUARIO_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
