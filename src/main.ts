import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AsyncApiModule } from './commons/application/asyncApi.module';
import { OpenApiModule } from './commons/application/openApi.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RascalServer } from './commons/infrastructure/rascal.server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new RascalServer(),
  });

  new OpenApiModule().setup(app);
  await new AsyncApiModule().setup(app);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
