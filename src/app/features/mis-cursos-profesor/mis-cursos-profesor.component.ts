import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CursosService } from '../../core/services/cursos.service';
import { Curso } from '../../core/domain/models';

@Component({
  selector: 'app-mis-cursos-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-cursos-profesor.component.html',
  styleUrls: ['./mis-cursos-profesor.component.css']
})
export class MisCursosProfesorComponent implements OnInit {
  cursos: Curso[] = [];

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    // Nota: en esta demo el profesor ve todos los cursos del instituto;
    // con un backend real se filtrarían por los cursos asignados a su cuenta.
    this.cursosService.listar().subscribe(cursos => (this.cursos = cursos));
  }
}
