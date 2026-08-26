import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { CursosService } from '../../application/cursos.service';
import { CURSO_REPOSITORY } from '../../domain/curso.repository';
import { CursoPrismaRepository } from '../../infrastructure/prisma/curso.prisma.repository';

@Module({
  controllers: [CursosController],
  providers: [CursosService, { provide: CURSO_REPOSITORY, useClass: CursoPrismaRepository }],
  exports: [CursosService]
})
export class CursosModule {}
