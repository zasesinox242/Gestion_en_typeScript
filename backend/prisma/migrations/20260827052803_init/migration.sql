-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "alumnos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "edad" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "alumno_curso" (
    "alumnoId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,

    PRIMARY KEY ("alumnoId", "cursoId"),
    CONSTRAINT "alumno_curso_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "alumnos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "alumno_curso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notas" (
    "alumnoId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,

    PRIMARY KEY ("alumnoId", "cursoId"),
    CONSTRAINT "notas_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "alumnos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "notas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_usuario_key" ON "usuarios"("usuario");
