import { Injectable, OnModuleInit } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';

@Injectable()
export class AmqpService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private queues = ['nestjs-ddd-poc-queue'];
  private amqpUrl = 'amqp://localhost:5672';

  private createMQProducer(amqpUrl: string, queues: string[]) {
    const connection = amqp.connect(amqpUrl);
    connection.on('connect', () => console.log('Connected!'));
    connection.on('connectFailed', (err) =>
      console.log('Connection failed.', err),
    );
    connection.on('disconnect', (err) => console.log('Disconnected.', err));
    this.channelWrapper = connection.createChannel({
      json: true,
      setup: (channel) => {
        queues.forEach((queue) => {
          channel.assertQueue(queue, { durable: true });
        });
      },
    });
  }

  async onModuleInit() {
    await this.createMQProducer(this.amqpUrl, this.queues);
  }

  async publish(queue: string, message: any) {
    return this.channelWrapper.sendToQueue(queue, message);
  }
}
