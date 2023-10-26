import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AsyncApiModule } from './commons/application/asyncApi.module';
import { OpenApiModule } from './commons/application/openApi.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import config from './commons/config';
import { RascalServer } from './rascal/server';
import { RascalService } from './rascal/service';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new RascalServer({
      rascalService: new RascalService(),
      config: config().rascal,
    }),
  });

  app.useLogger(app.get(Logger));

  new OpenApiModule().setup(app);
  await new AsyncApiModule().setup(app);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
