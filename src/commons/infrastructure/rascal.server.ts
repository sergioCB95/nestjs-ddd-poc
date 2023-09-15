import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { isObservable } from 'rxjs';
import { AmqpService } from './amqp.service';
export class RascalServer extends Server implements CustomTransportStrategy {
  constructor() {
    super();
  }

  async listen(callback: () => void) {
    const amqpService = new AmqpService();
    await amqpService.createBroker();
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
