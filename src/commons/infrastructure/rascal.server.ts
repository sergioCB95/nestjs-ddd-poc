import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { isObservable } from 'rxjs';
import { AmqpService } from './amqp.service';
export class RascalServer extends Server implements CustomTransportStrategy {
  config;
  constructor(config: any = {}) {
    super();
    this.config = config;
  }

  async listen(callback: () => void) {
    const amqpService = new AmqpService();
    await amqpService.createBroker(this.config);
    for await (let [pattern, handler] of this.messageHandlers.entries()) {
      const subscription = await amqpService.subscribe(pattern);
      subscription
        .on('message', async (message, content, ackOrNack) => {
          const data = JSON.parse(message.content.toString());
          try {
            const streamOrResult = await handler(data);
            if (isObservable(streamOrResult)) {
              streamOrResult.subscribe();
            }
            ackOrNack();
          } catch (err) {
            console.error(err);
            ackOrNack(err, [
              {
                strategy: 'republish',
                defer: 1000,
                attempts: 10,
              },
              {
                strategy: 'nack',
              },
            ]);
          }
        })
        .on('error', async (err) => {
          console.error(err);
        });
    }
    callback();
  }

  /**
   * This method is triggered on application shutdown.
   */
  close() {}
}
