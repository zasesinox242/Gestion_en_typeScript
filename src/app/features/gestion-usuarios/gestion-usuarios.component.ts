import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Usuario, Rol } from '../../core/domain/models';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: (Usuario & { editando?: boolean })[] = [];

  nuevoUsuario = {
    usuario: '',
    password: '',
    rol: 'alumno' as Rol
  };

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.usuariosService.listar().subscribe(usuarios => (this.usuarios = usuarios));
  }

  editar(usuario: Usuario & { editando?: boolean }): void {
    usuario.editando = true;
  }

  guardar(usuario: Usuario & { editando?: boolean }): void {
    this.usuariosService.actualizar(usuario.id, usuario).subscribe(() => {
      usuario.editando = false;
    });
  }

  eliminar(usuario: Usuario): void {
    this.usuariosService.eliminar(usuario.id).subscribe(() => this.cargar());
  }

  agregarUsuario(): void {
    const { usuario, password, rol } = this.nuevoUsuario;
    if (!usuario.trim() || !password.trim()) {
      return;
    }
    this.usuariosService.crear(usuario.trim(), password, rol).subscribe(() => {
      this.nuevoUsuario = { usuario: '', password: '', rol: 'alumno' };
      this.cargar();
    });
  }
}
