import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Usuario } from '../../domain/usuario.entity';
import { UsuarioRepository } from '../../domain/usuario.repository';

@Injectable()
export class UsuarioPrismaRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async buscarPorNombreUsuario(usuario: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { usuario } });
  }

  async crear(datos: Omit<Usuario, 'id'>): Promise<Usuario> {
    return this.prisma.usuario.create({ data: datos });
  }

  async actualizar(id: number, cambios: Partial<Omit<Usuario, 'id'>>): Promise<Usuario> {
    return this.prisma.usuario.update({ where: { id }, data: cambios });
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.usuario.delete({ where: { id } });
  }
}
