import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // <-- IMPORTANT

  app.enableCors({
    origin: process.env.URL_FRONTEND, // <-- autorise Next.js
    credentials: true, // <-- si tu veux utiliser des cookies ou headers auth
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use('/payments/webhook', bodyParser.raw({ type: 'application/json' }));

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription(
      'API de gestion des utilisateurs, produits, commandes, etc.',
    )
    .setVersion('1.0')
    .addTag('ecommerce')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Accessible via http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
