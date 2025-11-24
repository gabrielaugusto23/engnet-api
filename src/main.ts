import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/nestjs/module/app.module'; 
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aqui fica a configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('EngNet API')
    .setDescription('API para gestão de processos internos, reembolsos e relatórios.')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // A documentação fica na rota /api

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
