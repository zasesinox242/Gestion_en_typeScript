import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Alumno {
  nombres: string;
  apellidos: string;
  edad: number;
  editando?: boolean;
}

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent {

  alumnos: Alumno[] = [
    { nombres: 'Valeria', apellidos: 'Montoya Ríos', edad: 13 },
    { nombres: 'Andrés Marcos', apellidos: 'Paredes Salazar', edad: 14 },
    { nombres: 'Luciana', apellidos: 'Herrera Campos', edad: 12 },
    { nombres: 'Diego Franco', apellidos: 'Quispe López', edad: 13 }
  ];

  nuevoAlumno: Alumno = {
    nombres: '',
    apellidos: '',
    edad: 0
  };

  editar(alumno: Alumno) {
    alumno.editando = true;
  }

  guardar(alumno: Alumno) {
    alumno.editando = false;
  }

  eliminar(index: number) {
    this.alumnos.splice(index, 1);
  }

  agregarAlumno() {
    if (
      this.nuevoAlumno.nombres &&
      this.nuevoAlumno.apellidos &&
      this.nuevoAlumno.edad > 0
    ) {
      this.alumnos.push({ ...this.nuevoAlumno });
      this.nuevoAlumno = { nombres: '', apellidos: '', edad: 0 };
    }
  }
}
