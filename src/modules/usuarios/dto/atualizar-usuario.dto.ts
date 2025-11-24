import { PartialType } from '@nestjs/mapped-types';
import { CriarUsuarioDto } from './criar-usuario.dto';
import { IsOptional } from 'class-validator';

export class AtualizarUsuarioDto extends PartialType(CriarUsuarioDto) {
  @IsOptional()
  nome?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  senha?: string;

  @IsOptional()
  avatar_url?: string;
}
