import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Rol } from '../../domain/usuario.entity';

const ROLES: Rol[] = ['admin', 'profesor', 'alumno'];

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  usuario!: string;

  @IsString()
  @MinLength(4)
  password!: string;

  @IsIn(ROLES)
  rol!: Rol;
}

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  usuario?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  password?: string;

  @IsOptional()
  @IsIn(ROLES)
  rol?: Rol;
}
