import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  MinLength, 
  IsOptional, 
  IsEnum, 
  IsBoolean 
} from 'class-validator';
import { UserRole } from '../../../entity/user/user.enums'; 

export class CriarUsuarioDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({ example: 'joao@engnet.com.br', description: 'E-mail único para login' })
  @IsEmail({}, { message: 'Por favor, forneça um email válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha de acesso (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  senha: string;

  @ApiProperty({ 
    enum: UserRole, 
    example: UserRole.MEMBER, 
    description: 'Papel do usuário no sistema',
    required: false 
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'O papel deve ser ADMIN ou MEMBER' })
  role?: UserRole; 

  @ApiProperty({ 
    example: true, 
    description: 'Define se o usuário pode acessar o sistema',
    required: false
  })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @ApiProperty({ 
    example: 'https://exemplo.com/foto.jpg', 
    description: 'URL da foto de perfil',
    required: false
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string; 
}