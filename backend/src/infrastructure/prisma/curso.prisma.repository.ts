import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Curso } from '../../domain/curso.entity';
import { CursoRepository } from '../../domain/curso.repository';

@Injectable()
export class CursoPrismaRepository implements CursoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Curso[]> {
    return this.prisma.curso.findMany();
  }

  async buscarPorId(id: number): Promise<Curso | null> {
    return this.prisma.curso.findUnique({ where: { id } });
  }

  async crear(datos: Omit<Curso, 'id'>): Promise<Curso> {
    return this.prisma.curso.create({ data: datos });
  }

  async actualizar(id: number, cambios: Partial<Omit<Curso, 'id'>>): Promise<Curso> {
    return this.prisma.curso.update({ where: { id }, data: cambios });
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.curso.delete({ where: { id } });
  }
}
