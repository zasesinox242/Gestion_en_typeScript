import { IsNotEmpty, IsString } from 'class-validator';

export class CrearCursoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}

export class ActualizarCursoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}
