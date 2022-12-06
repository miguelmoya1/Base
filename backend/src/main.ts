import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ bodyLimit: 52_428_800 }), { cors: true });

  app.use(urlencoded({ limit: process.env.MAX_SIZE_JSON, extended: true }));

  const configService = app.get(ConfigService);
  const environment = configService.get('NODE_ENV');
  const logLevels: LogLevel[] = environment === 'development' ? ['debug', 'error', 'warn', 'log', 'verbose'] : ['error'];

  app.useLogger(logLevels);

  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger('main');
  const PORT = configService.get('PORT');

  await app.listen(PORT, '0.0.0.0');

  logger.debug(`Server running on PORT - ${PORT}`);
  logger.debug(`Environment (${environment})`);
}
bootstrap();
