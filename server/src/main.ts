import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    // origin: ['http://localhost:3000', 'http://192.168.1.100:3000'],
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    bodyParser.json({
      limit: '100mb',
    }),
  );
  app.use(
    bodyParser.urlencoded({
      limit: '100mb',
      extended: true,
    }),
  );
  // Parse JSON with UTF-8 encoding
  // app.use(
  //   bodyParser.json({
  //     limit: '100mb',
  //     type: 'application/json; charset=utf-8',
  //   }),
  // );

  // // Parse URL-encoded with UTF-8 encoding
  // app.use(
  //   bodyParser.urlencoded({
  //     limit: '100mb',
  //     extended: true,
  //     type: 'application/x-www-form-urlencoded; charset=utf-8',
  //   }),
  // );

  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
      console.log(
        `Running in ${process.env.ENVIRONMENT} mode: ${process.env.ENVIRONMENT_MESSAGE}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
