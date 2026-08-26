import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Nota } from '../../../domain/nota/nota.entity';
import { NotaRepository } from '../../../domain/nota/nota.repository';

@Injectable()
export class NotaPrismaRepository implements NotaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listarPorCurso(cursoId: number): Promise<Nota[]> {
    return this.prisma.nota.findMany({ where: { cursoId } });
  }

  async upsert(nota: Nota): Promise<Nota> {
    return this.prisma.nota.upsert({
      where: { alumnoId_cursoId: { alumnoId: nota.alumnoId, cursoId: nota.cursoId } },
      create: nota,
      update: { valor: nota.valor }
    });
  }
}
