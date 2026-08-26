import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../../application/auth.service';
import { USUARIO_REPOSITORY } from '../../domain/usuario.repository';
import { UsuarioPrismaRepository } from '../../infrastructure/prisma/usuario.prisma.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'cambia-este-valor-en-produccion',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN ?? '8h' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: USUARIO_REPOSITORY, useClass: UsuarioPrismaRepository }
  ],
  exports: [JwtModule]
})
export class AuthModule {}
