import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AsyncApiModule } from './commons/application/asyncApi.module';
import { OpenApiModule } from './commons/application/openApi.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import config from './commons/config';
import { AppServer } from './commons/infrastructure/app.server';
import { RascalService } from './commons/infrastructure/rascal.service';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new AppServer(new RascalService(), config().rascal),
  });

  app.useLogger(app.get(Logger));

  new OpenApiModule().setup(app);
  await new AsyncApiModule().setup(app);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
