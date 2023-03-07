import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter,NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
  const configService: ConfigService = app.get(ConfigService);
  app.enableCors();
  const config = new DocumentBuilder().addBearerAuth()
  .setTitle('Nest App')
  .setDescription('The NestJS API description')
  .setVersion('1.0')
  .addTag('NestApp')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT'));
  Logger.log(`App Listening to PORT ${configService.get('PORT')} - ${process.env.NODE_ENV} Env`);
}
bootstrap();