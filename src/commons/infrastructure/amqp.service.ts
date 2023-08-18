import { Injectable, OnModuleInit } from '@nestjs/common';
import { BrokerAsPromised as Broker } from 'rascal';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmqpService {
  private broker: Broker;
  private readonly amqpUrl: string;

  constructor() {
    this.amqpUrl = 'amqp://localhost:5672';
  }

  async createBroker() {
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
          queues: [
            'nestjs-ddd-poc-queue_order.created',
            'nestjs-ddd-poc-queue_order.updated',
          ],
          bindings: {
            'order.created_nestjs-ddd-poc-queue_order.created': {
              source: 'order.created',
              destination: 'nestjs-ddd-poc-queue_order.created',
            },
            'order.updated_nestjs-ddd-poc-queue_order.updated': {
              source: 'order.updated',
              destination: 'nestjs-ddd-poc-queue_order.updated',
            },
          },
        },
      },
      publications: {
        order_created: {
          vhost: '/',
          exchange: 'order.created',
        },
        order_updated: {
          vhost: '/',
          exchange: 'order.updated',
        },
      },
      subscriptions: {
        order_updated: {
          vhost: '/',
          queue: 'nestjs-ddd-poc-queue_order.updated',
          contentType: 'application/json',
        },
      },
    });
    this.broker.on('error', console.error);
  }

  async publish(event: string, message: any) {
    return this.broker.publish(event, message);
  }

  async subscribe(event: string) {
    return this.broker.subscribe(event);
  }
}
