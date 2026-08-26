import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { NotasService } from '../../../application/notas/notas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RegistrarNotaDto } from './nota.dto';

@Controller('notas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get()
  listarPorCurso(@Query('cursoId') cursoId: string) {
    return this.notasService.listarPorCurso(Number(cursoId));
  }

  @Post()
  @Roles('profesor', 'admin')
  registrar(@Body() dto: RegistrarNotaDto) {
    return this.notasService.registrar(dto);
  }
}
