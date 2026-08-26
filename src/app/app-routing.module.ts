import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';

import { AdminComponent } from './features/admin/admin.component';
import { AdminResumenComponent } from './features/admin-resumen/admin-resumen.component';
import { GestionCursosComponent } from './features/gestion-cursos/gestion-cursos.component';
import { GestionUsuariosComponent } from './features/gestion-usuarios/gestion-usuarios.component';
import { ListaAlumnosComponent } from './features/lista-alumnos/lista-alumno.component';

import { CursosHorizontalComponent } from './features/cursos-horizontal/cursos-horizontal.component';
import { MisCursosProfesorComponent } from './features/mis-cursos-profesor/mis-cursos-profesor.component';
import { NotasAlumnoComponent } from './features/notas-alumno/notas-alumno.component';

import { CursosAlumnoComponent } from './features/cursos-alumno/cursos-alumno.component';
import { MisCursosAlumnoComponent } from './features/mis-cursos-alumno/mis-cursos-alumno.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', component: AdminResumenComponent },
      { path: 'gestion-cursos', component: GestionCursosComponent },
      { path: 'gestion-cursos/:cursoId/alumnos', component: ListaAlumnosComponent },
      { path: 'gestion-usuarios', component: GestionUsuariosComponent }
    ]
  },

  {
    path: 'profesor',
    component: CursosHorizontalComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['profesor'] },
    children: [
      { path: '', component: MisCursosProfesorComponent },
      { path: 'notas/:cursoId', component: NotasAlumnoComponent }
    ]
  },

  {
    path: 'alumno',
    component: CursosAlumnoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['alumno'] },
    children: [
      { path: '', component: MisCursosAlumnoComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
