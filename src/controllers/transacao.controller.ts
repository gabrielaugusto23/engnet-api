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
import { TransacaoService } from '../application/transcao/transacao.service';
import { CreateTransacaoDto } from '../application/transcao/dto/create-transacao.dto';
import { UpdateTransacaoDto } from '../application/transcao/dto/update-transacao.dto';

@ApiTags('Transações')
@Controller('transacoes')
export class TransacaoController {
  constructor(private readonly service: TransacaoService) {}

  @Post()
  @ApiOperation({ summary: 'Registra uma nova transação financeira' })
  @ApiResponse({ status: 201, description: 'Transação criada com sucesso.' })
  create(@Body() dto: CreateTransacaoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as transações' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca detalhes de uma transação' })
  @ApiParam({ name: 'id', description: 'UUID da transação' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de uma transação' })
  update(@Param('id') id: string, @Body() dto: UpdateTransacaoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove uma transação' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}