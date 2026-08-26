import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { CursosService } from '../../core/services/cursos.service';
import { UsuariosService } from '../../core/services/usuarios.service';
import { AlumnosService } from '../../core/services/alumnos.service';

@Component({
  selector: 'app-admin-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-resumen.component.html',
  styleUrls: ['./admin-resumen.component.css']
})
export class AdminResumenComponent implements OnInit {
  totalCursos = 0;
  totalUsuarios = 0;
  totalAlumnos = 0;
  cargando = true;

  constructor(
    private cursosService: CursosService,
    private usuariosService: UsuariosService,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.cursosService.listar(),
      this.usuariosService.listar(),
      this.alumnosService.listarTodos()
    ]).subscribe(([cursos, usuarios, alumnos]) => {
      this.totalCursos = cursos.length;
      this.totalUsuarios = usuarios.length;
      this.totalAlumnos = alumnos.length;
      this.cargando = false;
    });
  }
}
