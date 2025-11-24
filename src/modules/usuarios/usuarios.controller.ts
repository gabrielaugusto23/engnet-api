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
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criar(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.usuariosService.criar(criarUsuarioDto);
  }

  @Get()
  async obterTodos() {
    return this.usuariosService.obterTodos();
  }

  @Get(':id')
  async obterPorId(@Param('id') id: string) {
    return this.usuariosService.obterPorId(id);
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() atualizarUsuarioDto: AtualizarUsuarioDto) {
    return this.usuariosService.atualizar(id, atualizarUsuarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remover(@Param('id') id: string) {
    await this.usuariosService.remover(id);
  }
}
