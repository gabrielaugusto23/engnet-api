import * as process from 'node:process';
import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../../../entity/user/user.entity';
import { Cliente } from '../../../entity/client/client.entity';
import { Reembolso } from '../../../entity/reembolso/reembolso.entity';
import { Relatorio } from '../../../entity/relatorio/relatorio.entity';
import { Venda } from 'src/entity/venda/venda.entity';
import { Transacao } from 'src/entity/transacao/transacao.entity';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'teste_db', 
  
  entities: [
    UserEntity,
    Cliente,
    Reembolso,
    Relatorio,
    Venda,
    Transacao,
  ],
  
  synchronize: false, 
  
  logging: true,
}));