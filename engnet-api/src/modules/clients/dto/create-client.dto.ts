import {ApiProperty} from "@nestjs/swagger";
import{
    IsEmail,  
    IsNotEmpty, //sao regras importadas da class-validator
    IsOptional,
    IsString,
    MinLength,
    IsEnum,
    IsNumber,
    Min,
} from 'class-validator';
import {ClientStatus} from "../entities/client-status.enum";
export class CriacaoClienteDto{
    @ApiProperty({
        description: 'Nome completo do cliente',
        example: 'João da Silva'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'email do cliente',
        example: 'joao@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Telefone Obrigatorio',
        example: '(61) 99999-9999'
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({  
        description: 'Status(opcional na criacao)',  //em tese, esse campo nao seria
        enum: ClientStatus,                          //obrigatorio, pois se nao for
        required: false                              //informado, dizemos que eh novo
    })
    @IsEnum(ClientStatus)
    @IsOptional()
    status?: ClientStatus;

    @ApiProperty({
        description: 'Total de Compras (opcional)',
        example: 0,
        required: false
    })
    @IsNumber()             //mesma logica, se nao for preenchido, eh assumido como 0
    @IsOptional()
    @Min(0)
    TotalCompras?: number;
}