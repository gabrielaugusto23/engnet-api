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
import { UserRole, Departamento, Cargo } from '../../../entity/user/user.enums'; 

export class CriarUsuarioDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome completo' })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({ example: 'joao@engnet.com.br' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  senha: string;

  @ApiProperty({ example: '(61) 99999-9999', description: 'Telefone de contato' })
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;

  @ApiProperty({ enum: Departamento, example: Departamento.DESENVOLVIMENTO })
  @IsEnum(Departamento, { message: 'Departamento inválido' })
  @IsNotEmpty()
  departamento: Departamento;

  @ApiProperty({ enum: Cargo, example: Cargo.ANALISTA })
  @IsEnum(Cargo, { message: 'Cargo inválido' })
  @IsNotEmpty()
  cargo: Cargo;

  @ApiProperty({ required: false, example: 'Responsável pela infraestrutura' })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ enum: UserRole, example: UserRole.MEMBER, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole; 

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @ApiProperty({ example: 'https://foto.jpg', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string; 
}