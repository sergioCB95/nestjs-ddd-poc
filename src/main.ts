import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AsyncApiModule } from './commons/application/asyncApi.module';
import { OpenApiModule } from './commons/application/openApi.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  new OpenApiModule().setup(app);
  await new AsyncApiModule().setup(app);

  await app.listen(3000);
}
bootstrap();
