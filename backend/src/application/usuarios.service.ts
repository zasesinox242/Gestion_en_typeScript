import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioSinPassword } from '../domain/usuario.entity';
import { USUARIO_REPOSITORY, UsuarioRepository } from '../domain/usuario.repository';

const SALT_ROUNDS = 10;

function sinPassword(usuario: Usuario): UsuarioSinPassword {
  const { password, ...resto } = usuario;
  return resto;
}

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(USUARIO_REPOSITORY) private readonly usuarioRepo: UsuarioRepository
  ) {}

  async listar(): Promise<UsuarioSinPassword[]> {
    const usuarios = await this.usuarioRepo.listar();
    return usuarios.map(sinPassword);
  }

  async crear(usuario: string, password: string, rol: Usuario['rol']): Promise<UsuarioSinPassword> {
    const existente = await this.usuarioRepo.buscarPorNombreUsuario(usuario);
    if (existente) {
      throw new ConflictException('Ya existe un usuario con ese nombre');
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const creado = await this.usuarioRepo.crear({ usuario, password: hash, rol });
    return sinPassword(creado);
  }

  async actualizar(id: number, cambios: Partial<Pick<Usuario, 'usuario' | 'password' | 'rol'>>): Promise<UsuarioSinPassword> {
    const existente = await this.usuarioRepo.buscarPorId(id);
    if (!existente) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const datos = { ...cambios };
    if (datos.password) {
      datos.password = await bcrypt.hash(datos.password, SALT_ROUNDS);
    }
    const actualizado = await this.usuarioRepo.actualizar(id, datos);
    return sinPassword(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.usuarioRepo.eliminar(id);
  }
}
