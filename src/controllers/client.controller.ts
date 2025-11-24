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
import { ClientService } from '../application/client/client.service';
import { CreateClientDto } from '../application/client/dto/create-client.dto';
import { UpdateClientDto } from '../application/client/dto/update-client.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado.' })
  create(@Body() dto: CreateClientDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um cliente pelo ID' })
  @ApiParam({ name: 'id', description: 'UUID do cliente' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um cliente' })
  @ApiParam({ name: 'id', description: 'UUID do cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso.' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um cliente' })
  @ApiParam({ name: 'id', description: 'UUID do cliente' })
  @ApiResponse({ status: 204, description: 'Cliente removido com sucesso.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}