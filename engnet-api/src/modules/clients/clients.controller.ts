import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {ClientsService} from './clients.service';
import {CriacaoClienteDto} from './dto/create-client.dto';
import {UpdateClientDto} from './dto/update-client.dto';

@ApiTags('Clientes')
@ApiBearerAuth()
@Controller('Clientes')
export class ClientesController{
  constructor(private readonly clientsService: ClientsService){}
  @Post()
  @ApiOperation({summary: 'Cadastrar novo cliente'})
  @ApiResponse({status: 201, description: 'Cliente criado com sucesso.'})
  @ApiResponse({status: 400, description: 'Não foi possível criar o cliente.'})
  create(@Body() criacaoClienteDto: CriacaoClienteDto){
    return this.clientsService.create(criacaoClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Ver um cliente por ID'})
  @ApiResponse({status: 404, description: 'Cliente não foi encontrado'})
  findOne(@Param('id', ParseUUIDPipe)id: string){
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Edite o cliente pelo seu ID'})
  @ApiResponse({status: 404, description: 'Cliente não foi encontrado.'})
  update(
    @Param('id', ParseUUIDPipe)id: string,
    @Body() updateClientDto: UpdateClientDto,
  ){
    return this.clientsService.update(id, updateClientDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({summary: 'Exclua um cliente pelo seu ID'})
  @ApiResponse({status: 404, description: 'Cliente não foi encontrado.'})
  remove(@Param('id', ParseUUIDPipe)id: string){
    return this.clientsService.remove(id);
  }
}
