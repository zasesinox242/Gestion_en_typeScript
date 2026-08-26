import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CursosService } from '../../application/cursos.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { CrearCursoDto, ActualizarCursoDto } from './curso.dto';

@Controller('cursos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  listar() {
    // Todos los roles autenticados pueden ver los cursos (admin, profesor, alumno).
    return this.cursosService.listar();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.cursosService.obtener(id);
  }

  @Post()
  @Roles('admin')
  crear(@Body() dto: CrearCursoDto) {
    return this.cursosService.crear(dto.nombre);
  }

  @Put(':id')
  @Roles('admin')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarCursoDto) {
    return this.cursosService.actualizar(id, dto.nombre);
  }

  @Delete(':id')
  @Roles('admin')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.cursosService.eliminar(id);
  }
}
