import { Controller, Get, Post, Patch, Body, Param, HttpCode, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RelatorioService } from '../application/relatorio/relatorio.service';
import { CreateRelatorioDto } from '../application/relatorio/dto/create-relatorio.dto';
import { UpdateRelatorioDto } from '../application/relatorio/dto/update-relatorio.dto';

@ApiTags('Relatórios') 
@Controller('relatorios')
export class RelatorioController {
  constructor(private readonly service: RelatorioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo relatório' })
  @ApiResponse({ status: 201, description: 'Relatório criado com sucesso.' })
  create(@Body() dto: CreateRelatorioDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os relatórios' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um relatório pelo ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um relatório' })
  @ApiParam({ name: 'id', description: 'UUID do relatório' })
  @ApiResponse({ status: 200, description: 'Relatório atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Relatório não encontrado.' })
  update(@Param('id') id: string, @Body() dto: UpdateRelatorioDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um relatório' })
  @ApiParam({ name: 'id', description: 'UUID do relatório' })
  @ApiResponse({ status: 204, description: 'Relatório removido com sucesso.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}