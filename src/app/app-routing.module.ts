import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { AdminComponent } from './features/admin/admin.component';
import { CursosAlumnoComponent } from './features/cursos-alumno/cursos-alumno.component';
import { CursosHorizontalComponent } from './features/cursos-horizontal/cursos-horizontal.component';
import { GestionCursosComponent } from './features/gestion-cursos/gestion-cursos.component';
import { GestionUsuariosComponent } from './features/gestion-usuarios/gestion-usuarios.component';
import { ListaAlumnosComponent } from './features/lista-alumnos/lista-alumno.component';
import { NotasAlumnoComponent } from './features/notas-alumno/notas-alumno.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'cursos-profesor',
    component: CursosHorizontalComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['profesor'] }
  },
  {
    path: 'cursos-alumno',
    component: CursosAlumnoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['alumno'] }
  },
  {
    path: 'admin/gestion-cursos',
    component: GestionCursosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },

  {
    path: 'admin/gestion-usuarios',
    component: GestionUsuariosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/gestion-cursos/lista-alumnos',
    component: ListaAlumnosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'cursos-horizontal/notas-alumno',
    component: NotasAlumnoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['profesor', 'alumno'] }
  },

  { path: '**', redirectTo: '' }
];
