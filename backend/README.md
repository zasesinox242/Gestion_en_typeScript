# Backend — Sistema de Gestión Académica

API REST en NestJS que reemplaza la capa en memoria (`core/data`) del
frontend Angular, manteniendo la misma separación por capas que ya tenía
el proyecto, pero como Clean Architecture real de servidor:

```
src/
  domain/         → entidades puras + interfaces de repositorio (puertos).
                    No importan Nest ni Prisma.
  application/    → casos de uso (equivalente a los *.service.ts de Angular,
                    pero del lado servidor). Dependen solo de las interfaces
                    del dominio, nunca de Prisma directamente.
  infrastructure/ → PrismaService + repositorios que IMPLEMENTAN las
                    interfaces del dominio. Es la única capa que sabe que
                    existe una base de datos.
  interface/http/ → controllers, DTOs (class-validator) y guards. Traduce
                    HTTP hacia/desde los casos de uso.
```

## Cómo correrlo

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts   # carga los mismos usuarios/cursos/alumnos de la demo
npm run start:dev            # http://localhost:3000
```

Usuarios de prueba (mismas credenciales que ya usabas, ahora con password
hasheado con bcrypt en vez de texto plano):

| Usuario | Contraseña | Rol      |
|---------|------------|----------|
| admin   | admin123   | admin    |
| profe   | profe123   | profesor |
| alumno  | alumno123  | alumno   |

## Endpoints

- `POST /auth/login` → `{ usuario, password }` → `{ token, rol, usuario }`
- `GET /cursos`, `POST /cursos` (admin), `PUT /cursos/:id` (admin), `DELETE /cursos/:id` (admin)
- `GET /alumnos?cursoId=`, `POST /alumnos` (admin), `PUT /alumnos/:id` (admin), `DELETE /alumnos/:id` (admin)
- `GET /notas?cursoId=`, `POST /notas` (profesor, admin)
- `GET /usuarios`, `POST /usuarios`, `PUT /usuarios/:id`, `DELETE /usuarios/:id` (todo admin-only)

Todas las rutas (salvo `/auth/login`) requieren `Authorization: Bearer <token>`.

## Nota sobre esta entrega

`npx prisma generate` no se pudo ejecutar en el sandbox donde armé esto
(necesita descargar un binario desde `binaries.prisma.sh`, bloqueado ahí).
Sí verifiqué con `tsc --noEmit` que todo el código de dominio, aplicación,
controllers y guards type-checka sin errores — lo único que falta es que
Prisma genere los tipos del cliente en tu máquina, lo cual es el primer
paso normal de cualquier setup de Prisma.

## Conectar con el frontend Angular

En `core/data/*.repository.ts` del Angular, reemplazar `BehaviorSubject` por
`HttpClient` contra `http://localhost:3000`, guardando el `token` que
devuelve `/auth/login` y mandándolo en el header `Authorization` de cada
request. `core/services` y las pantallas no deberían necesitar cambios.
