import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //Faz o DTOs funcionarem
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,    //remove o que nao eh util do JSON
    forbidNonWhitelisted: true,      //se nao existir no DTO da erro
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Engnet API')
    .setDescription('Documentação da API do Sistema Engnet')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicação rodando em: http://localhost:3000/api`);
}
bootstrap();
