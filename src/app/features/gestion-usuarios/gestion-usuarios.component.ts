import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Usuario, Rol } from '../../core/domain/models';
import { ColumnaTabla, EditableTableComponent } from '../../shared/ui/editable-table/editable-table.component';

const OPCIONES_ROL = [
  { value: 'admin', label: 'Administrador' },
  { value: 'profesor', label: 'Profesor' },
  { value: 'alumno', label: 'Alumno' }
];

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, EditableTableComponent],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  nuevoUsuario = {
    usuario: '',
    password: '',
    rol: 'alumno' as Rol
  };

  columnas: ColumnaTabla<Usuario>[] = [
    { key: 'usuario', label: 'Usuario' },
    { key: 'password', label: 'Contraseña', enmascarar: true },
    { key: 'rol', label: 'Rol', tipo: 'select', opciones: OPCIONES_ROL }
  ];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.usuariosService.listar().subscribe(usuarios => (this.usuarios = usuarios));
  }

  guardar(usuario: Usuario): void {
    this.usuariosService.actualizar(usuario.id, usuario).subscribe();
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
