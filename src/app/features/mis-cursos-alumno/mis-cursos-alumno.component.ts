import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../core/services/cursos.service';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Curso } from '../../core/domain/models';

@Component({
  selector: 'app-mis-cursos-alumno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-cursos-alumno.component.html',
  styleUrls: ['./mis-cursos-alumno.component.css']
})
export class MisCursosAlumnoComponent implements OnInit {
  cursos: Curso[] = [];

  // Nota: la demo no vincula la cuenta de login con un registro de Alumno
  // específico (no hay ese modelo de relación en los datos de ejemplo).
  // Aquí se usa el alumno de ejemplo con id=1 para representar al alumno activo.
  private ALUMNO_DEMO_ID = 1;

  constructor(
    private cursosService: CursosService,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit(): void {
    this.alumnosService.listarTodos().subscribe(alumnos => {
      const yo = alumnos.find(a => a.id === this.ALUMNO_DEMO_ID);
      const misCursoIds = yo?.cursosIds ?? [];
      this.cursosService.listar().subscribe(cursos => {
        this.cursos = cursos.filter(c => misCursoIds.includes(c.id));
      });
    });
  }
}
