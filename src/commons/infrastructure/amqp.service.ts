import { Injectable, OnModuleInit } from '@nestjs/common';
import { BrokerAsPromised as Broker } from 'rascal';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmqpService {
  private broker: Broker;

  async createBroker(config: any = {}) {
    this.broker = await Broker.create(config);
    this.broker.on('error', console.error);
  }

  async publish(event: string, message: any) {
    return this.broker.publish(event, message);
  }

  async subscribe(event: string) {
    return this.broker.subscribe(event);
  }
}
