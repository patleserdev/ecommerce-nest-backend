"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const aws_serverless_express_1 = require("aws-serverless-express");
let cachedServer = null;
async function bootstrapServer() {
    if (cachedServer) {
        return (event, context, callback) => (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
    }
    const expressApp = express();
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    nestApp.use(cookieParser());
    nestApp.enableCors({
        origin: process.env.URL_FRONTEND,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    nestApp.use('/payments/webhook', bodyParser.raw({ type: 'application/json' }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('E-commerce API')
        .setDescription('API de gestion des utilisateurs, produits, commandes, etc.')
        .setVersion('1.0')
        .addTag('ecommerce')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(nestApp, config);
    swagger_1.SwaggerModule.setup('api', nestApp, document);
    await nestApp.init();
    cachedServer = (0, aws_serverless_express_1.createServer)(expressApp);
    return (event, context, callback) => (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
}
const handler = async (event, context, callback) => {
    const server = await bootstrapServer();
    return server(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=main-lambda.js.map