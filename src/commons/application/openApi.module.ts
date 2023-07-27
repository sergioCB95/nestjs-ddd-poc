import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class OpenApiModule {
  setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('NestJS DDD POC')
      .setDescription('NestJS DDD POC API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
}
