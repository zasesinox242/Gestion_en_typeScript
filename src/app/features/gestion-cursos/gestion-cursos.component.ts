import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CursosService } from '../../core/services/cursos.service';
import { Curso } from '../../core/domain/models';

@Component({
  selector: 'app-gestion-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestion-cursos.component.html',
  styleUrls: ['./gestion-cursos.component.css']
})
export class GestionCursosComponent implements OnInit {
  cursos: (Curso & { editando?: boolean })[] = [];
  nombreNuevoCurso = '';

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cursosService.listar().subscribe(cursos => (this.cursos = cursos));
  }

  agregar(): void {
    const nombre = this.nombreNuevoCurso.trim();
    if (!nombre) {
      return;
    }
    this.cursosService.crear(nombre).subscribe(() => {
      this.nombreNuevoCurso = '';
      this.cargar();
    });
  }

  editar(curso: Curso & { editando?: boolean }): void {
    curso.editando = true;
  }

  guardar(curso: Curso & { editando?: boolean }): void {
    this.cursosService.actualizar(curso.id, curso.nombre).subscribe(() => {
      curso.editando = false;
    });
  }

  eliminar(curso: Curso): void {
    this.cursosService.eliminar(curso.id).subscribe(() => this.cargar());
  }
}
