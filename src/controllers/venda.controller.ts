import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { VendaService } from '../application/venda/venda.service';
import { CreateVendaDto } from '../application/venda/dto/create-venda.dto';
import { UpdateVendaDto } from '../application/venda/dto/update-venda.dto';

@ApiTags('Vendas')
@Controller('vendas')
export class VendaController {
  constructor(private readonly service: VendaService) {}

  @Post()
  @ApiOperation({ summary: 'Registra uma nova venda' })
  @ApiResponse({ status: 201, description: 'Venda registrada com sucesso.' })
  create(@Body() dto: CreateVendaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as vendas' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca detalhes de uma venda' })
  @ApiParam({ name: 'id', description: 'UUID da venda' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de uma venda' })
  update(@Param('id') id: string, @Body() dto: UpdateVendaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove uma venda' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}