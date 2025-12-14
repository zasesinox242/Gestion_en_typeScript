import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NotaAlumno {
  nombres: string;
  apellidos: string;
  nota: number;
  editando?: boolean;
}

@Component({
  selector: 'app-notas-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas-alumno.component.html',
  styleUrls: ['./notas-alumno.component.css']
})
export class NotasAlumnoComponent {

  alumnos: NotaAlumno[] = [
    { nombres: 'Valeria', apellidos: 'Montoya Ríos', nota: 18 },
    { nombres: 'Andrés Marcos', apellidos: 'Paredes Salazar', nota: 19 },
    { nombres: 'Luciana', apellidos: 'Herrera Campos', nota: 16 }
  ];

  editar(alumno: NotaAlumno) {
    alumno.editando = true;
  }

  guardar(alumno: NotaAlumno) {
    alumno.editando = false;
  }

  eliminar(alumno: NotaAlumno) {
    alumno.nota = 0;
  }
}
