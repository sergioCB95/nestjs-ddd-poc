import { INestApplication } from '@nestjs/common';
import {
  AsyncApiDocumentBuilder,
  AsyncApiModule as AsyncApi,
} from 'nestjs-asyncapi';

export class AsyncApiModule {
  async setup(app: INestApplication) {
    const asyncApiOptions = new AsyncApiDocumentBuilder()
      .setTitle('NestJS DDD POC')
      .setDescription('NestJS DDD POC API description')
      .setVersion('1.0')
      .setDefaultContentType('application/json')
      .build();

    const asyncApiDocument = await AsyncApi.createDocument(
      app,
      asyncApiOptions,
    );
    await AsyncApi.setup('/async-docs', app, asyncApiDocument);
  }
}
