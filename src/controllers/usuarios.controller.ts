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
  UseGuards // <--- Importe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosService } from '../application/user/usuarios.service';
import { CriarUsuarioDto } from '../application/user/dto/create-user.dto';
import { AtualizarUsuarioDto } from '../application/user/dto/update-user.dto';

// Imports de Segurança
import { JwtAuthGuard } from '../application/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../application/auth/guards/roles.guard';
import { Roles } from '../application/auth/decorators/roles.decorator';
import { UserRole } from '../entity/user/user.enums';

@ApiTags('Usuários') 
@ApiBearerAuth() // <--- Adiciona o cadeado no Swagger
@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard) // <--- Protege TUDO com Login + Validação de Roles
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles(UserRole.ADMIN) // Só ADMIN cria usuário
  @ApiOperation({ summary: 'Cria um novo usuário (Apenas Admin)' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 403, description: 'Proibido (Apenas Admin).' })
  create(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.usuariosService.criar(criarUsuarioDto);
  }

  @Get()
  // Se não colocar @Roles, qualquer usuário logado (Admin ou Member) pode acessar
  @ApiOperation({ summary: 'Lista todos os usuários' })
  findAll() {
    return this.usuariosService.obterTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  findOne(@Param('id') id: string) {
    return this.usuariosService.obterPorId(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN) // Só ADMIN edita (regra de negócio comum)
  @ApiOperation({ summary: 'Atualiza dados de um usuário (Apenas Admin)' })
  update(@Param('id') id: string, @Body() atualizarUsuarioDto: AtualizarUsuarioDto) {
    return this.usuariosService.atualizar(id, atualizarUsuarioDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN) // Só ADMIN deleta
  @HttpCode(HttpStatus.NO_CONTENT) 
  @ApiOperation({ summary: 'Remove um usuário do sistema (Apenas Admin)' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remover(id);
  }
}