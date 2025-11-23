import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, isEmail } from "class-validator";

export class CreateUserDto{
    @ApiProperty({example: 'Maria Suarez'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'Maria@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '12345678',
        description: 'Senha com no mínimo 8 caracteres'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @IsOptional()
    avatarUrl?: string;
}