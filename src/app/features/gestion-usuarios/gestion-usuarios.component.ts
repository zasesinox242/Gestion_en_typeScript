import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

type Rol = 'admin' | 'profesor' | 'alumno';

interface Usuario {
  usuario: string;
  password: string;
  role: Rol;
  editando?: boolean;
}

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent {

  usuarios: Usuario[] = [];

  nuevoUsuario: Usuario = {
    usuario: '',
    password: '',
    role: 'alumno'
  };

  constructor(private authService: AuthService) {
    // Referencia directa a los usuarios del login
    this.usuarios = this.authService.usuarios;
  }

  editar(usuario: Usuario) {
    usuario.editando = true;
  }

  guardar(usuario: Usuario) {
    usuario.editando = false;
  }

  eliminar(index: number) {
    this.usuarios.splice(index, 1);
  }

  agregarUsuario() {
    if (
      this.nuevoUsuario.usuario &&
      this.nuevoUsuario.password &&
      this.nuevoUsuario.role
    ) {
      this.usuarios.push({ ...this.nuevoUsuario });
      this.nuevoUsuario = {
        usuario: '',
        password: '',
        role: 'alumno'
      };
    }
  }
}
