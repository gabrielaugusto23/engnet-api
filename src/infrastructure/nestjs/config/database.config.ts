// src/infrastructure/nestjs/config/database.config.ts
import * as process from 'node:process';
import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Importando as entidades (Ajuste os caminhos se necessário)
import { UserEntity } from '../../../entity/user/user.entity';
import { Cliente } from '../../../entity/client/client.entity';
import { Reembolso } from '../../../entity/reembolso/reembolso.entity';
import { ItemReembolso } from '../../../entity/reembolso/item-reembolso.entity';
import { TipoDespesa } from '../../../entity/tipo-despesa/tipo-despesa.entity';
import { SolicitaAprova } from '../../../entity/solicita-aprova/solicita-aprova.entity';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'teste_db', 
  
  // Lista de entidades que o TypeORM vai gerenciar
  entities: [
    UserEntity,
    Cliente,
    Reembolso,
    ItemReembolso,
    TipoDespesa,
    SolicitaAprova,
  ],
  
  synchronize: false, 
  
  logging: true,
}));