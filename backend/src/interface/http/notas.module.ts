import { Module } from '@nestjs/common';
import { NotasController } from './notas.controller';
import { NotasService } from '../../application/notas.service';
import { NOTA_REPOSITORY } from '../../domain/nota.repository';
import { NotaPrismaRepository } from '../../infrastructure/prisma/nota.prisma.repository';

@Module({
  controllers: [NotasController],
  providers: [NotasService, { provide: NOTA_REPOSITORY, useClass: NotaPrismaRepository }],
  exports: [NotasService]
})
export class NotasModule {}
