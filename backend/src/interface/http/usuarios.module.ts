import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../../application/usuarios.service';
import { USUARIO_REPOSITORY } from '../../domain/usuario.repository';
import { UsuarioPrismaRepository } from '../../infrastructure/prisma/usuario.prisma.repository';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, { provide: USUARIO_REPOSITORY, useClass: UsuarioPrismaRepository }],
  exports: [UsuariosService]
})
export class UsuariosModule {}
