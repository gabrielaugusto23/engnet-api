import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus,
  Headers 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiHeader } from '@nestjs/swagger';
import { ReembolsoService } from '../application/reembolso/reembolso.service';
import { CreateReembolsoDto } from '../application/reembolso/dto/create-reembolso.dto';
import { UpdateReembolsoDto } from '../application/reembolso/dto/update-reembolso.dto';

@ApiTags('Reembolsos')
@Controller('reembolsos')
export class ReembolsoController {
  constructor(private readonly service: ReembolsoService) {}

  @Post()
  @ApiOperation({ summary: 'Solicita um novo reembolso' })
  @ApiHeader({
    name: 'x-user-id',
    description: 'UUID do usuário logado (Simulação de Auth)',
    required: true
  })
  @ApiResponse({ status: 201, description: 'Reembolso criado com sucesso.' })
  create(
    @Body() dto: CreateReembolsoDto,
    @Headers('x-user-id') userId: string 
  ) {
    return this.service.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os reembolsos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca detalhes de um reembolso' })
  @ApiParam({ name: 'id', description: 'UUID do reembolso' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um reembolso' })
  update(@Param('id') id: string, @Body() dto: UpdateReembolsoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um reembolso' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}