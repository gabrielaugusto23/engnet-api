import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config"; // Importe o ConfigModule
import { AuthController } from "../../../controllers/auth.controllers";
import { AuthService } from "../../../application/auth/auth.service";
import { UsuariosService } from "../../../application/user/usuarios.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../../entity/user/user.entity";
import { JwtStrategy } from "../../../application/auth/strategies/jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        ConfigModule, 
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'JWT_SECRET',
                signOptions: { expiresIn: '1d' }, // Token válido por 1 dia
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsuariosService, JwtStrategy],
})
export class AuthModule {}