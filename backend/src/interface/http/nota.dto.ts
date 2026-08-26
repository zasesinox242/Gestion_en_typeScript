import { IsInt, Max, Min } from 'class-validator';

export class RegistrarNotaDto {
  @IsInt()
  alumnoId!: number;

  @IsInt()
  cursoId!: number;

  @IsInt()
  @Min(0)
  @Max(20)
  valor!: number;
}
