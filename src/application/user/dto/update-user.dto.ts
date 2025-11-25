import { PartialType } from '@nestjs/swagger'; 
import { CriarUsuarioDto } from './create-user.dto';

export class AtualizarUsuarioDto extends PartialType(CriarUsuarioDto) {}