import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './interface/http/auth.module';
import { CursosModule } from './interface/http/cursos.module';
import { AlumnosModule } from './interface/http/alumnos.module';
import { NotasModule } from './interface/http/notas.module';
import { UsuariosModule } from './interface/http/usuarios.module';

@Module({
  imports: [PrismaModule, AuthModule, CursosModule, AlumnosModule, NotasModule, UsuariosModule]
})
export class AppModule {}
