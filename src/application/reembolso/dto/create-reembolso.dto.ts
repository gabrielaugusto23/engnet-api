import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsDateString,
  Min
} from 'class-validator';
import { CategoriaReembolso, StatusReembolso } from '../../../entity/reembolso/reembolso.enums';

export class CreateReembolsoDto {
  @ApiProperty({ 
    enum: CategoriaReembolso, 
    example: CategoriaReembolso.ALIMENTACAO,
    description: 'Categoria da despesa' 
  })
  @IsEnum(CategoriaReembolso)
  categoria: CategoriaReembolso;

  @ApiProperty({ example: 'Almoço com cliente XYZ', description: 'Descrição curta' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ 
    required: false, 
    example: 'Alinhamento de projeto e fechamento de contrato.', 
    description: 'Justificativa detalhada para fins comerciais' 
  })
  @IsOptional()
  @IsString()
  justificativa?: string;

  @ApiProperty({ example: 85.50, description: 'Valor da despesa' })
  @IsNumber()
  @Min(0)
  valor: number;

  @ApiProperty({ 
    example: '2025-06-09', 
    description: 'Data exata da despesa (YYYY-MM-DD)' 
  })
  @IsDateString()
  dataDespesa: string; 

  @ApiProperty({ 
    enum: StatusReembolso, 
    example: StatusReembolso.PENDENTE,
    required: false,
    description: 'Se omitido, cria como RASCUNHO ou PENDENTE'
  })
  @IsOptional()
  @IsEnum(StatusReembolso)
  status?: StatusReembolso;

  @ApiProperty({ 
    required: false, 
    example: 'comprovante.pdf', 
    description: 'Link do comprovante (upload feito separadamente)' 
  })
  @IsOptional()
  @IsString()
  comprovanteUrl?: string;
}