import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { getFrontUrlStr } from './config/front-url.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: getFrontUrlStr(),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('DHC Task')
    .setDescription('Api documentation for DHC Task')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
