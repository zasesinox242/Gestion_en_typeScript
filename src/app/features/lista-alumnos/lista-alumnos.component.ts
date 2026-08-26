import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlumnosService } from '../../core/services/alumnos.service';
import { CursosService } from '../../core/services/cursos.service';
import { Alumno } from '../../core/domain/models';
import { ColumnaTabla, EditableTableComponent } from '../../shared/ui/editable-table/editable-table.component';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EditableTableComponent],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {
  cursoId!: number;
  nombreCurso = '';
  alumnos: Alumno[] = [];

  nuevoAlumno = { nombres: '', apellidos: '', edad: null as number | null };

  columnas: ColumnaTabla<Alumno>[] = [
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'edad', label: 'Edad', tipo: 'number' }
  ];

  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
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
    this.alumnosService.listarPorCurso(this.cursoId).subscribe(alumnos => (this.alumnos = alumnos));
  }

  guardar(alumno: Alumno): void {
    this.alumnosService.actualizar(alumno.id, alumno).subscribe();
  }

  eliminar(alumno: Alumno): void {
    this.alumnosService.eliminar(alumno.id).subscribe(() => this.cargar());
  }

  agregarAlumno(): void {
    const { nombres, apellidos, edad } = this.nuevoAlumno;
    if (!nombres.trim() || !apellidos.trim() || !edad || edad <= 0) {
      return;
    }
    this.alumnosService
      .crear({ nombres: nombres.trim(), apellidos: apellidos.trim(), edad, cursosIds: [this.cursoId] })
      .subscribe(() => {
        this.nuevoAlumno = { nombres: '', apellidos: '', edad: null };
        this.cargar();
      });
  }
}
