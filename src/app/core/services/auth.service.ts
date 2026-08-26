import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuariosRepository } from '../data/usuarios.repository';
import { Rol } from '../domain/models';

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
  constructor(private usuariosRepo: UsuariosRepository) {}

  login(usuario: string, password: string): Observable<SesionActiva> {
    return this.usuariosRepo.findByCredentials(usuario, password).pipe(
      switchMap(encontrado => {
        if (!encontrado) {
          return throwError(() => ({ message: 'Usuario o contraseña incorrectos' }));
        }
        // Nota: token simulado únicamente para fines de demostración.
        // En un backend real esto sería un JWT firmado por el servidor.
        const payload = { usuario: encontrado.usuario, rol: encontrado.rol, iat: Date.now() };
        const token = btoa(JSON.stringify(payload));

        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(ROL_KEY, encontrado.rol);
        localStorage.setItem(USUARIO_KEY, encontrado.usuario);

        return [{ token, rol: encontrado.rol, usuario: encontrado.usuario }];
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
