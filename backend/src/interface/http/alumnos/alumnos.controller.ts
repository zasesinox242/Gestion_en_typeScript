import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AlumnosService } from '../../../application/alumnos/alumnos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CrearAlumnoDto, ActualizarAlumnoDto } from './alumno.dto';

@Controller('alumnos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get()
  // Nota: igual que en el frontend hoy, el rol "alumno" ve la lista completa
  // porque la cuenta de login aún no está vinculada a un registro de Alumno
  // (ver README del frontend, sección "Decisiones y limitaciones conocidas").
  // Cuando se resuelva esa vinculación, este endpoint debería filtrar server-side
  // por el alumno autenticado en vez de exponer la lista entera.
  listar(@Query('cursoId') cursoId?: string) {
    if (cursoId) {
      return this.alumnosService.listarPorCurso(Number(cursoId));
    }
    return this.alumnosService.listarTodos();
  }

  @Post()
  @Roles('admin')
  crear(@Body() dto: CrearAlumnoDto) {
    return this.alumnosService.crear(dto);
  }

  @Put(':id')
  @Roles('admin')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarAlumnoDto) {
    return this.alumnosService.actualizar(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.alumnosService.eliminar(id);
  }
}
