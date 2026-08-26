import { Nota } from './nota.entity';

export interface NotaRepository {
  listarPorCurso(cursoId: number): Promise<Nota[]>;
  upsert(nota: Nota): Promise<Nota>;
}

export const NOTA_REPOSITORY = Symbol('NOTA_REPOSITORY');
