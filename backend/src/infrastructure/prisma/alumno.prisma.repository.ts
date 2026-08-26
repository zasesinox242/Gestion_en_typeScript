import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Alumno } from '../../domain/alumno.entity';
import { AlumnoRepository } from '../../domain/alumno.repository';

type AlumnoConMatriculas = {
  id: number;
  nombres: string;
  apellidos: string;
  edad: number;
  matriculas: { cursoId: number }[];
};

@Injectable()
export class AlumnoPrismaRepository implements AlumnoRepository {
  constructor(private readonly prisma: PrismaService) {}

  private aEntidad(row: AlumnoConMatriculas): Alumno {
    return {
      id: row.id,
      nombres: row.nombres,
      apellidos: row.apellidos,
      edad: row.edad,
      cursosIds: row.matriculas.map(m => m.cursoId)
    };
  }

  async listar(): Promise<Alumno[]> {
    const rows = await this.prisma.alumno.findMany({ include: { matriculas: true } });
    return rows.map((row: AlumnoConMatriculas) => this.aEntidad(row));
  }

  async listarPorCurso(cursoId: number): Promise<Alumno[]> {
    const rows = await this.prisma.alumno.findMany({
      where: { matriculas: { some: { cursoId } } },
      include: { matriculas: true }
    });
    return rows.map((row: AlumnoConMatriculas) => this.aEntidad(row));
  }

  async buscarPorId(id: number): Promise<Alumno | null> {
    const row = await this.prisma.alumno.findUnique({ where: { id }, include: { matriculas: true } });
    return row ? this.aEntidad(row) : null;
  }

  async crear(datos: Omit<Alumno, 'id'>): Promise<Alumno> {
    const row = await this.prisma.alumno.create({
      data: {
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        edad: datos.edad,
        matriculas: { create: datos.cursosIds.map(cursoId => ({ cursoId })) }
      },
      include: { matriculas: true }
    });
    return this.aEntidad(row);
  }

  async actualizar(id: number, cambios: Partial<Omit<Alumno, 'id'>>): Promise<Alumno> {
    const { cursosIds, ...datosSimples } = cambios;

    if (cursosIds) {
      // Reemplaza las matrículas por la nueva lista (simple y suficiente para el CRUD actual).
      await this.prisma.alumnoCurso.deleteMany({ where: { alumnoId: id } });
      await this.prisma.alumnoCurso.createMany({
        data: cursosIds.map(cursoId => ({ alumnoId: id, cursoId }))
      });
    }

    const row = await this.prisma.alumno.update({
      where: { id },
      data: datosSimples,
      include: { matriculas: true }
    });
    return this.aEntidad(row);
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.alumno.delete({ where: { id } });
  }
}
