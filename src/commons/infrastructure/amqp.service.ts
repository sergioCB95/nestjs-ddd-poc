import { Injectable, OnModuleInit } from '@nestjs/common';
import { BrokerAsPromised as Broker } from 'rascal';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmqpService implements OnModuleInit {
  private broker: Broker;
  private readonly amqpUrl: string;

  constructor(private configService: ConfigService) {
    this.amqpUrl = this.configService.get<string>('amqp.url');
  }

  private async createMQProducer() {
    this.broker = await Broker.create({
      vhosts: {
        '/': {
          connection: {
            url: this.amqpUrl,
          },
          exchanges: {
            'order.created': {
              type: 'fanout',
              options: {
                durable: false,
              },
            },
            'order.updated': {
              type: 'fanout',
              options: {
                durable: false,
              },
            },
          },
          queues: ['nestjs-ddd-poc-queue'],
          bindings: {
            'order.created_nestjs-ddd-poc-queue': {
              source: 'order.created',
              destination: 'nestjs-ddd-poc-queue',
            },
            'order.updated_nestjs-ddd-poc-queue': {
              source: 'order.updated',
              destination: 'nestjs-ddd-poc-queue',
            },
          },
          publications: {
            order_created: {
              exchange: 'order.created',
            },
            order_updated: {
              exchange: 'order.updated',
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
