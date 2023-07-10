import { Injectable, OnModuleInit } from '@nestjs/common';
import { BrokerAsPromised as Broker } from 'rascal';

@Injectable()
export class AmqpService implements OnModuleInit {
  private broker: Broker;
  private async createMQProducer() {
    this.broker = await Broker.create({
      vhosts: {
        '/': {
          connection: {
            url: 'amqp://guest:guest@localhost:5672/',
          },
          exchanges: ['nestjs-ddd-poc-exchange'],
          queues: ['nestjs-ddd-poc-queue'],
          bindings: [
            'nestjs-ddd-poc-exchange[nestjs-ddd-poc.v1.order.created] -> nestjs-ddd-poc-queue',
          ],
          publications: {
            order_created: {
              exchange: 'nestjs-ddd-poc-exchange',
              routingKey: 'nestjs-ddd-poc.v1.order.created',
            },
          },
        },
      },
    });
    this.broker.on('error', console.error);
  }

  async onModuleInit() {
    await this.createMQProducer();
  }

  async publish(event: string, message: any) {
    return this.broker.publish(event, message);
  }
}
