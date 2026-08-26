import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Curso } from '../domain/curso.entity';
import { CURSO_REPOSITORY, CursoRepository } from '../domain/curso.repository';

@Injectable()
export class CursosService {
  constructor(@Inject(CURSO_REPOSITORY) private readonly cursoRepo: CursoRepository) {}

  listar(): Promise<Curso[]> {
    return this.cursoRepo.listar();
  }

  async obtener(id: number): Promise<Curso> {
    const curso = await this.cursoRepo.buscarPorId(id);
    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }
    return curso;
  }

  crear(nombre: string): Promise<Curso> {
    return this.cursoRepo.crear({ nombre });
  }

  actualizar(id: number, nombre: string): Promise<Curso> {
    return this.cursoRepo.actualizar(id, { nombre });
  }

  eliminar(id: number): Promise<void> {
    return this.cursoRepo.eliminar(id);
  }
}
