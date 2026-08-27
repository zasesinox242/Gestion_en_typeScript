import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Rol, Usuario } from '../../../domain/usuario/usuario.entity';
import { UsuarioRepository } from '../../../domain/usuario/usuario.repository';

type UsuarioPrisma = { id: number; usuario: string; password: string; rol: string };

@Injectable()
export class UsuarioPrismaRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  // SQLite guarda `rol` como String (no soporta enums nativos); acá se traduce
  // al tipo literal del dominio. El valor ya fue validado por @IsIn en el DTO
  // antes de persistirse, así que el cast es seguro.
  private aDominio(u: UsuarioPrisma): Usuario {
    return { ...u, rol: u.rol as Rol };
  }

  async listar(): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany();
    return usuarios.map((u) => this.aDominio(u));
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    return usuario ? this.aDominio(usuario) : null;
  }

  async buscarPorNombreUsuario(usuario: string): Promise<Usuario | null> {
    const encontrado = await this.prisma.usuario.findUnique({ where: { usuario } });
    return encontrado ? this.aDominio(encontrado) : null;
  }

  async crear(datos: Omit<Usuario, 'id'>): Promise<Usuario> {
    const usuario = await this.prisma.usuario.create({ data: datos });
    return this.aDominio(usuario);
  }

  async actualizar(id: number, cambios: Partial<Omit<Usuario, 'id'>>): Promise<Usuario> {
    const usuario = await this.prisma.usuario.update({ where: { id }, data: cambios });
    return this.aDominio(usuario);
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.usuario.delete({ where: { id } });
  }
}