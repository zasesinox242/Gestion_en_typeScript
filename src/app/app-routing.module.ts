import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

// Todas las features se cargan de forma perezosa (loadComponent): cada rol
// baja solo el código que necesita, y esta tabla queda como única fuente de
// verdad de qué existe y a dónde vive, sin imports estáticos arriba.

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/ui/role-page/role-page.component').then(m => m.RolePageComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['admin'],
      shell: {
        rol: 'admin',
        navItems: [
          { label: 'Resumen', path: '/admin' },
          { label: 'Gestionar cursos', path: '/admin/gestion-cursos' },
          { label: 'Gestionar usuarios', path: '/admin/gestion-usuarios' }
        ]
      }
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin-resumen/admin-resumen.component').then(m => m.AdminResumenComponent)
      },
      {
        path: 'gestion-cursos',
        loadComponent: () =>
          import('./features/gestion-cursos/gestion-cursos.component').then(m => m.GestionCursosComponent)
      },
      {
        path: 'gestion-cursos/:cursoId/alumnos',
        loadComponent: () =>
          import('./features/lista-alumnos/lista-alumnos.component').then(m => m.ListaAlumnosComponent)
      },
      {
        path: 'gestion-usuarios',
        loadComponent: () =>
          import('./features/gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent)
      }
    ]
  },

  {
    path: 'profesor',
    loadComponent: () =>
      import('./shared/ui/role-page/role-page.component').then(m => m.RolePageComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['profesor'],
      shell: {
        rol: 'profesor',
        navItems: [{ label: 'Mis cursos', path: '/profesor' }]
      }
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/mis-cursos-profesor/mis-cursos-profesor.component').then(
            m => m.MisCursosProfesorComponent
          )
      },
      {
        path: 'notas/:cursoId',
        loadComponent: () =>
          import('./features/notas-alumno/notas-alumno.component').then(m => m.NotasAlumnoComponent)
      }
    ]
  },

  {
    path: 'alumno',
    loadComponent: () =>
      import('./shared/ui/role-page/role-page.component').then(m => m.RolePageComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['alumno'],
      shell: {
        rol: 'alumno',
        navItems: [{ label: 'Mis cursos', path: '/alumno' }]
      }
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/mis-cursos-alumno/mis-cursos-alumno.component').then(
            m => m.MisCursosAlumnoComponent
          )
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
