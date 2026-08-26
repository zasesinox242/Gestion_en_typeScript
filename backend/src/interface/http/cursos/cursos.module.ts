import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { CursosService } from '../../../application/cursos/cursos.service';
import { CURSO_REPOSITORY } from '../../../domain/curso/curso.repository';
import { CursoPrismaRepository } from '../../../infrastructure/prisma/repositories/curso.prisma.repository';

@Module({
  controllers: [CursosController],
  providers: [CursosService, { provide: CURSO_REPOSITORY, useClass: CursoPrismaRepository }],
  exports: [CursosService]
})
export class CursosModule {}
