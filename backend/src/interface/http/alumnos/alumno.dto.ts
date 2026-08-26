import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';

export class CrearAlumnoDto {
  @IsString()
  @IsNotEmpty()
  nombres!: string;

  @IsString()
  @IsNotEmpty()
  apellidos!: string;

  @IsInt()
  @Min(1)
  edad!: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  cursosIds!: number[];
}

export class ActualizarAlumnoDto {
  @IsString()
  nombres?: string;

  @IsString()
  apellidos?: string;

  @IsInt()
  @Min(1)
  edad?: number;

  @IsArray()
  @IsInt({ each: true })
  cursosIds?: number[];
}
