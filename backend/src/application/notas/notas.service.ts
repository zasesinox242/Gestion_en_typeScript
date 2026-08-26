import { Inject, Injectable } from '@nestjs/common';
import { Nota } from '../../domain/nota/nota.entity';
import { NOTA_REPOSITORY, NotaRepository } from '../../domain/nota/nota.repository';

@Injectable()
export class NotasService {
  constructor(@Inject(NOTA_REPOSITORY) private readonly notaRepo: NotaRepository) {}

  listarPorCurso(cursoId: number): Promise<Nota[]> {
    return this.notaRepo.listarPorCurso(cursoId);
  }

  registrar(nota: Nota): Promise<Nota> {
    return this.notaRepo.upsert(nota);
  }
}
