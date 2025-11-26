import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import databaseConfig from "../config/database.config";

import { AuthModule } from './auth.module';
import { UsuariosModule } from '../../../application/user/usuarios.module';
import { RelatorioModule } from "../../../application/relatorio/relatorio.module";
import { ClientModule } from '../../../application/client/client.module';
import { VendaModule } from '../../../application/venda/venda.module';
import { TransacaoModule } from '../../../application/transcao/transacao.module';
import { ReembolsoModule } from '../../../application/reembolso/reembolso.module';

import { UserEntity } from '../../../entity/user/user.entity';
import { Cliente } from '../../../entity/client/client.entity';
import { Reembolso } from '../../../entity/reembolso/reembolso.entity';
import { Venda } from '../../../entity/venda/venda.entity';
import { Transacao } from '../../../entity/transacao/transacao.entity';
import { Relatorio } from '../../../entity/relatorio/relatorio.entity';

@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    ClientModule,
    RelatorioModule,
    VendaModule,
    TransacaoModule,
    ReembolsoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
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
  controllers: [],
  providers: [],
})
export class AppModule {}