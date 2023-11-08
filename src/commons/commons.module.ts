import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { RascalClient } from 'nestjs-rascal';
import { RascalService } from 'nestjs-rascal';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] }), LoggerModule.forRoot()],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: RascalService,
      useFactory: () => {
        return new RascalService();
      },
    },
    {
      provide: RascalClient,
      useFactory: (
        rascalService: RascalService,
        configService: ConfigService,
      ) => {
        return new RascalClient({ rascalService, configService });
      },
      inject: [RascalService, ConfigService],
    },
  ],
  exports: [PrismaService, RascalClient],
})
export class CommonsModule {}
