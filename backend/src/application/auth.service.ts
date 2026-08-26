import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { USUARIO_REPOSITORY, UsuarioRepository } from '../domain/usuario.repository';
import { Rol } from '../domain/usuario.entity';

export interface SesionActiva {
  token: string;
  rol: Rol;
  usuario: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USUARIO_REPOSITORY) private readonly usuarioRepo: UsuarioRepository,
    private readonly jwtService: JwtService
  ) {}

  async login(usuario: string, password: string): Promise<SesionActiva> {
    const encontrado = await this.usuarioRepo.buscarPorNombreUsuario(usuario);
    if (!encontrado) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const coincide = await bcrypt.compare(password, encontrado.password);
    if (!coincide) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // JWT real y firmado por el servidor (reemplaza el btoa() simulado del frontend).
    const token = await this.jwtService.signAsync({
      sub: encontrado.id,
      usuario: encontrado.usuario,
      rol: encontrado.rol
    });

    return { token, rol: encontrado.rol, usuario: encontrado.usuario };
  }
}
