import * as crypto from 'crypto';
global['crypto'] = crypto as any;

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// entidades
import { UserEntity } from '../../../entity/user/user.entity';
import { Cliente } from '../../../entity/client/client.entity';
import { Reembolso } from '../../../entity/reembolso/reembolso.entity';
import { Venda } from '../../../entity/venda/venda.entity';
import { Transacao } from '../../../entity/transacao/transacao.entity';
import { Relatorio } from '../../../entity/relatorio/relatorio.entity';

// controllers
import { AuthController } from '../../../controllers/auth.controllers';
import { ClientController } from '../../../controllers/client.controller';
import { UsuariosController } from '../../../controllers/usuarios.controller';

// services
import { AuthService } from '../../../application/auth/auth.service';
import { ClientService } from '../../../application/client/client.service';
import { UsuariosService } from '../../../application/user/usuarios.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'engnet_db',
      entities: [UserEntity, Cliente, Reembolso, Venda, Transacao, Relatorio],
      synchronize: true,
    }),
    
    TypeOrmModule.forFeature([UserEntity, Cliente, Reembolso, Venda, Transacao, Relatorio]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'segredo_padrao',
      signOptions: { expiresIn: 600 },
    }),
  ],
  controllers: [AuthController, ClientController, UsuariosController],
  providers: [AuthService, ClientService, UsuariosService],
})
export class AppModule {} 
