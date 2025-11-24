import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  MinLength 
} from 'class-validator';
import { StatusCliente } from '../../../entity/client/client.enums';

export class CreateClientDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do cliente' })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail único do cliente' })
  @IsEmail({}, { message: 'Forneça um e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({ example: '(11) 99999-1111', description: 'Telefone de contato' })
  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;

  @ApiProperty({ 
    example: 150.50, 
    description: 'Valor total já comprado (Opcional, padrão é 0)',
    required: false 
  })
  @IsOptional()
  @IsNumber()
  totalCompras?: number;

  @ApiProperty({ 
    enum: StatusCliente, 
    example: StatusCliente.NOVO, 
    description: 'Status atual do cliente',
    required: false
  })
  @IsOptional()
  @IsEnum(StatusCliente)
  status?: StatusCliente;
}