import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/nestjs/module/app.module'; 
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('EngNet API')
    .setDescription('API EngNet')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3001);
}

bootstrap().catch((error) => {
  console.error('Erro ao iniciar a aplicação:', error);
  process.exit(1);
});