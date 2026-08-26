import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NotasService, AlumnoConNota } from '../../core/services/notas.service';
import { CursosService } from '../../core/services/cursos.service';

@Component({
  selector: 'app-notas-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './notas-alumno.component.html',
  styleUrls: ['./notas-alumno.component.css']
})
export class NotasAlumnoComponent implements OnInit {
  cursoId!: number;
  nombreCurso = '';
  alumnos: (AlumnoConNota & { editando?: boolean })[] = [];

  constructor(
    private route: ActivatedRoute,
    private notasService: NotasService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cursoId = Number(params.get('cursoId'));
      this.cursosService.obtener(this.cursoId).subscribe(curso => {
        this.nombreCurso = curso?.nombre ?? 'Curso';
      });
      this.cargar();
    });
  }

  private cargar(): void {
    this.notasService.listarPorCurso(this.cursoId).subscribe(alumnos => (this.alumnos = alumnos));
  }

  editar(alumno: AlumnoConNota & { editando?: boolean }): void {
    alumno.editando = true;
  }

  guardar(alumno: AlumnoConNota & { editando?: boolean }): void {
    const valor = Math.min(20, Math.max(0, alumno.nota ?? 0));
    this.notasService.guardarNota(this.cursoId, alumno.alumnoId, valor).subscribe(() => {
      alumno.nota = valor;
      alumno.editando = false;
    });
  }
}
