import { Module } from '@nestjs/common';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from '../../../application/alumnos/alumnos.service';
import { ALUMNO_REPOSITORY } from '../../../domain/alumno/alumno.repository';
import { AlumnoPrismaRepository } from '../../../infrastructure/prisma/repositories/alumno.prisma.repository';

@Module({
  controllers: [AlumnosController],
  providers: [AlumnosService, { provide: ALUMNO_REPOSITORY, useClass: AlumnoPrismaRepository }],
  exports: [AlumnosService]
})
export class AlumnosModule {}
