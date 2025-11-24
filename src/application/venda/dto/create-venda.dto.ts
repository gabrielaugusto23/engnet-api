import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsUUID, 
  IsDateString,
  Min
} from 'class-validator';
import { CategoriaVenda, StatusVenda } from '../../../entity/venda/venda.enums';

export class CreateVendaDto {
  @ApiProperty({ example: 'Consultoria de Software', description: 'Descrição curta da venda' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ enum: CategoriaVenda, example: CategoriaVenda.CONSULTORIA })
  @IsEnum(CategoriaVenda)
  categoria: CategoriaVenda;

  @ApiProperty({ example: 5000.00, description: 'Valor monetário da venda' })
  @IsNumber()
  @Min(0)
  valor: number;

  @ApiProperty({ enum: StatusVenda, example: StatusVenda.PENDENTE })
  @IsEnum(StatusVenda)
  status: StatusVenda;

  @ApiProperty({ 
    example: '2025-11-24T10:00:00-03:00', 
    description: 'Data da venda (ISO 8601). Se vazio, usa data atual.',
    required: false 
  })
  @IsOptional()
  @IsDateString()
  dataHora?: string;

  @ApiProperty({ description: 'UUID do Vendedor (Usuário)', example: 'uuid-do-vendedor' })
  @IsNotEmpty()
  @IsUUID()
  vendedorId: string;

  @ApiProperty({ description: 'UUID do Cliente', example: 'uuid-do-cliente' })
  @IsNotEmpty()
  @IsUUID()
  clienteId: string;
}