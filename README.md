# Sistema de Gestión Académica

Aplicación Angular (standalone components) que simula un sistema de gestión
académica con control de acceso por rol: **administrador**, **profesor** y
**alumno**.

> Proyecto de práctica / portafolio. El "backend" es una capa de datos en
> memoria (ver sección *Arquitectura*) — no hay persistencia real ni servidor.

## Stack

- Angular 19 (standalone components, sin `NgModule`s de feature)
- TypeScript, RxJS
- Sin dependencias de UI externas — sistema de diseño propio en CSS puro

## Cómo correrlo

```bash
npm install
npm start        # http://localhost:4200
```

Usuarios de prueba:

| Usuario  | Contraseña | Rol        |
|----------|------------|------------|
| admin    | admin123   | admin      |
| profe    | profe123   | profesor   |
| alumno   | alumno123  | alumno     |

## Arquitectura

El proyecto sigue una separación por capas dentro de `src/app`:

```
core/
  domain/models/   → interfaces puras del dominio (Usuario, Curso, Alumno, Nota)
  data/            → repositorios en memoria (simulan una base de datos).
                     Exponen Observables — el día que haya un backend real,
                     solo esta capa cambia de implementación (HttpClient en
                     vez de BehaviorSubject), el resto de la app no se entera.
  services/        → lógica de negocio sobre los repositorios (AuthService,
                     CursosService, AlumnosService, NotasService, UsuariosService)
  guards/          → AuthGuard (sesión activa) y RoleGuard (autorización por rol)

shared/ui/shell/   → layout compartido (sidebar + topbar) usado por los tres
                     roles, evita duplicar header/footer en cada pantalla

features/          → una carpeta por pantalla, solo UI + wiring a los servicios
  login/
  admin/                   (shell del admin)
  admin-resumen/           (resumen con estadísticas)
  gestion-cursos/          (CRUD de cursos)
  gestion-usuarios/        (CRUD de cuentas)
  lista-alumnos/           (alumnos matriculados en un curso, por :cursoId)
  cursos-horizontal/       (shell del profesor)
  mis-cursos-profesor/     (cursos que dicta)
  notas-alumno/            (notas de un curso, por :cursoId)
  cursos-alumno/           (shell del alumno)
  mis-cursos-alumno/       (cursos en los que está matriculado)
```

### Rutas

Cada rol tiene un "shell" persistente (sidebar + topbar) y pantallas hijas
que se renderizan dentro de él vía rutas anidadas:

```
/login
/admin                              → resumen (estadísticas)
/admin/gestion-cursos                → CRUD de cursos
/admin/gestion-cursos/:cursoId/alumnos → alumnos de ese curso
/admin/gestion-usuarios              → CRUD de cuentas
/profesor                           → cursos que dicta
/profesor/notas/:cursoId             → notas de ese curso
/alumno                             → cursos matriculados
```

`AuthGuard` protege el acceso (sesión activa) y `RoleGuard` autoriza según
el rol definido en `data: { roles: [...] }` de cada ruta.

## Decisiones y limitaciones conocidas

- **No hay backend real.** Los repositorios (`core/data`) simulan latencia
  de red con `delay()` para que la interacción se sienta realista, pero los
  datos viven en memoria y se pierden al recargar la página.
- **Credenciales de ejemplo en el código.** Es intencional para esta demo;
  en un entorno real las credenciales nunca deberían estar hardcodeadas ni
  las contraseñas en texto plano.
- **La cuenta de alumno no está vinculada a un registro de `Alumno`
  específico** (no existe ese modelo de relación en los datos de ejemplo).
  La pantalla "Mis cursos" del alumno usa un registro de ejemplo fijo para
  representar al alumno activo — con un backend real, el usuario autenticado
  determinaría directamente sus cursos.
- **El "token" de sesión es un `base64` del payload**, no un JWT firmado.
  Sirve para demostrar el flujo de guards, no para seguridad real.

## Próximos pasos posibles

- Reemplazar `core/data` por servicios HTTP contra una API real (Node/Express
  o Firebase), sin tocar `core/services` ni las pantallas.
- Vincular la cuenta de alumno con su propio registro de `Alumno`.
- Tests end-to-end del flujo de login + navegación por rol.
