import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

type Rol = 'admin' | 'profesor' | 'alumno';

export interface LoginResponse {
  token: string;
  role: Rol;
}

interface UsuarioAuth {
  usuario: string;
  password: string;
  role: Rol;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarios: UsuarioAuth[] = [
    { usuario: 'admin', password: 'admin123', role: 'admin' },
    { usuario: 'profe', password: 'profe123', role: 'profesor' },
    { usuario: 'alumno', password: 'alumno123', role: 'alumno' }
  ];

  private tokenKey = 'token';
  private roleKey = 'role';

  login(usuario: string, password: string): Observable<LoginResponse> {
    const user = this.usuarios.find(
      u => u.usuario === usuario && u.password === password
    );

    if (!user) {
      return throwError(() => ({ message: 'Credenciales inválidas' }));
    }

    const fakePayload = { usuario: user.usuario, role: user.role, iat: Date.now() };
    const fakeToken = btoa(JSON.stringify(fakePayload));

    localStorage.setItem(this.tokenKey, fakeToken);
    localStorage.setItem(this.roleKey, user.role);

    return of({ token: fakeToken, role: user.role }).pipe(delay(300));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getRole(): Rol | null {
    return localStorage.getItem(this.roleKey) as Rol | null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
