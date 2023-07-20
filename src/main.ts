import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NestJS DDD POC')
    .setDescription('NestJS DDD POC API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('NestJS DDD POC')
    .setDescription('NestJS DDD POC API description')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .build();

  const asyncApiDocument = await AsyncApiModule.createDocument(
    app,
    asyncApiOptions,
  );
  await AsyncApiModule.setup('/async-docs', app, asyncApiDocument);

  await app.listen(3000);
}
bootstrap();
