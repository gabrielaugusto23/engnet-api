import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  Min
} from 'class-validator';
import { StatusCliente, EstadosBrasil } from '../../../entity/client/client.enums';

export class CreateClientDto {
  @ApiProperty({ example: 'Empresa ABC Ltda', description: 'Razão social ou nome fantasia' })
  @IsString()
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório' })
  nomeEmpresa: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome do contato principal' })
  @IsString()
  @IsNotEmpty({ message: 'O nome do contato é obrigatório' })
  nome: string;

  @ApiProperty({ example: 'contato@empresa.com', description: 'E-mail principal' })
  @IsEmail({}, { message: 'Forneça um e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ example: '(11) 99999-1111', description: 'Telefone de contato' })
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;

  @ApiProperty({ required: false, example: '12.345.678/0001-90' })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({ required: false, example: 'Rua das Flores, 123' })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({ required: false, example: 'São Paulo' })
  @IsOptional()
  @IsString()
  cidade?: string;

  @ApiProperty({ 
    required: false, 
    enum: EstadosBrasil, 
    example: EstadosBrasil.SP,
    description: 'Sigla do Estado (UF)'
  })
  @IsOptional()
  @IsEnum(EstadosBrasil)
  estado?: EstadosBrasil;

  @ApiProperty({ required: false, example: '01000-000' })
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiProperty({ required: false, example: 'Cliente VIP com contrato anual.' })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ 
    example: 0, 
    description: 'Valor total já comprado (Opcional)',
    required: false 
  })
  @IsOptional()
  @IsNumber()
  totalCompras?: number;

  @ApiProperty({ 
    enum: StatusCliente, 
    example: StatusCliente.NOVO, 
    required: false
  })
  @IsOptional()
  @IsEnum(StatusCliente)
  status?: StatusCliente;
}