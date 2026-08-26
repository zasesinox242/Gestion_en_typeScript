import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = (plano: string) => bcrypt.hash(plano, 10);

  await prisma.usuario.createMany({
    data: [
      { usuario: 'admin', password: await passwordHash('admin123'), rol: 'admin' },
      { usuario: 'profe', password: await passwordHash('profe123'), rol: 'profesor' },
      { usuario: 'alumno', password: await passwordHash('alumno123'), rol: 'alumno' }
    ]
  });

  const algebra = await prisma.curso.create({ data: { nombre: 'Álgebra' } });
  const comunicacion = await prisma.curso.create({ data: { nombre: 'Comunicación' } });

  const valeria = await prisma.alumno.create({
    data: { nombres: 'Valeria', apellidos: 'Montoya Ríos', edad: 13 }
  });
  const andres = await prisma.alumno.create({
    data: { nombres: 'Andrés Marcos', apellidos: 'Paredes Salazar', edad: 14 }
  });
  const luciana = await prisma.alumno.create({
    data: { nombres: 'Luciana', apellidos: 'Herrera Campos', edad: 12 }
  });
  const diego = await prisma.alumno.create({
    data: { nombres: 'Diego Franco', apellidos: 'Quispe López', edad: 13 }
  });

  await prisma.alumnoCurso.createMany({
    data: [
      { alumnoId: valeria.id, cursoId: algebra.id },
      { alumnoId: valeria.id, cursoId: comunicacion.id },
      { alumnoId: andres.id, cursoId: algebra.id },
      { alumnoId: luciana.id, cursoId: algebra.id },
      { alumnoId: luciana.id, cursoId: comunicacion.id },
      { alumnoId: diego.id, cursoId: comunicacion.id }
    ]
  });

  await prisma.nota.createMany({
    data: [
      { alumnoId: valeria.id, cursoId: algebra.id, valor: 18 },
      { alumnoId: andres.id, cursoId: algebra.id, valor: 19 },
      { alumnoId: luciana.id, cursoId: algebra.id, valor: 16 },
      { alumnoId: valeria.id, cursoId: comunicacion.id, valor: 17 },
      { alumnoId: luciana.id, cursoId: comunicacion.id, valor: 15 },
      { alumnoId: diego.id, cursoId: comunicacion.id, valor: 14 }
    ]
  });

  console.log('Seed completado.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
