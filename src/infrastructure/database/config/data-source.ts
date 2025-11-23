import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Carregando as variáveis do .env
dotenv.config(); 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'teste_db',
  
  // Aqui aponta para onde as entidades estão
  entities: ['src/entity/**/*.entity.ts'],
  
  // Aqui aponta para onde as migrations serão salvas
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  
  synchronize: false,
});