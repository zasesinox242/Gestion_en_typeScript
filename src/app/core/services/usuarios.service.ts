import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosRepository } from '../data/usuarios.repository';
import { Usuario, Rol } from '../domain/models';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(private repo: UsuariosRepository) {}

  listar(): Observable<Usuario[]> {
    return this.repo.list();
  }

  crear(usuario: string, password: string, rol: Rol): Observable<Usuario> {
    return this.repo.create({ usuario, password, rol });
  }

  actualizar(id: number, cambios: Partial<Usuario>): Observable<Usuario> {
    return this.repo.update(id, cambios);
  }

  eliminar(id: number): Observable<void> {
    return this.repo.delete(id);
  }
}
