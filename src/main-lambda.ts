// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Handler, Context, Callback } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';

let cachedServer: ReturnType<typeof createServer> | null = null;

/**
 * Initialise Nest avec Express Adapter, configure middlewares (CORS, cookieParser, bodyParser, Swagger)
 * et crée un "server" Express/Lambda via aws-serverless-express.
 */
async function bootstrapServer(): Promise<Handler> {
  if (cachedServer) {
    return (event, context, callback) =>
      proxy(cachedServer!, event, context, 'PROMISE').promise;
  }

  // 1) Créer une instance Express + Nest
  const expressApp = express();
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // 2) Middlewares globaux (identiques à votre code original)
  nestApp.use(cookieParser());

  nestApp.enableCors({
    origin: process.env.URL_FRONTEND, // autorise votre frontend Next.js
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Pour Stripe ou tout autre webhook qui attend un body raw
  nestApp.use(
    '/payments/webhook',
    bodyParser.raw({ type: 'application/json' }),
  );

  // 3) Swagger (toujours disponible à /api-docs ou /api selon votre config)
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription(
      'API de gestion des utilisateurs, produits, commandes, etc.',
    )
    .setVersion('1.0')
    .addTag('ecommerce')
    .build();

  const document = SwaggerModule.createDocument(nestApp, config);
  // Attention : dans un environnement serverless, swagger-ui peut parfois
  // nécessiter un chemin absolu. Ici on mappe /api → Swagger UI.
  SwaggerModule.setup('api', nestApp, document);

  // 4) Initialiser Nest (mais ne pas écouter sur un port)
  await nestApp.init();

  // 5) Construire le server Lambda via aws-serverless-express
  cachedServer = createServer(expressApp);
  return (event, context, callback) =>
    proxy(cachedServer!, event, context, 'PROMISE').promise;
}

/**
 * Export “handler” que Vercel appellera pour chaque requête.
 * C’est le point d’entrée serverless.
 */
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrapServer();
  return server(event, context, callback);
};
