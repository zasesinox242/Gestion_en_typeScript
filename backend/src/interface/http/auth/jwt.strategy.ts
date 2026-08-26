import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Rol } from '../../../domain/usuario/usuario.entity';

export interface JwtPayload {
  sub: number;
  usuario: string;
  rol: Rol;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'cambia-este-valor-en-produccion'
    });
  }

  // Lo que retorna acá queda disponible como `request.user` en los controllers.
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
