import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 201,
  });

  await app.listen(3001, () => {
    console.log('Servidor em execução na porta 3001');
  });
}
bootstrap();
const proxy = express();
proxy.use('/', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
proxy.listen(3000, () => {
  console.log('Proxy em execução na porta 3000');
});
