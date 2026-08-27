import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './interface/http/auth/auth.module';
import { CursosModule } from './interface/http/cursos/cursos.module';
import { AlumnosModule } from './interface/http/alumnos/alumnos.module';
import { NotasModule } from './interface/http/notas/notas.module';
import { UsuariosModule } from './interface/http/usuarios/usuarios.module';

@Module({
  imports: [PrismaModule, AuthModule, CursosModule, AlumnosModule, NotasModule, UsuariosModule]
})
export class AppModule {}
