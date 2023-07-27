import { AmqpService } from '../infrastructure/amqp.service';
import {
  EventSubscriber,
  EventSubscriptionCallback,
} from '../domain/event.subscriber';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AmqpEventSubscriber extends EventSubscriber {
  constructor(protected readonly amqpService: AmqpService) {
    super();
  }

  protected async subscribeToEvent<T>(
    subscriptionName: string,
    callback: EventSubscriptionCallback<T>,
  ): Promise<void> {
    try {
      const subscription = await this.amqpService.subscribe(subscriptionName);
      subscription
        .on('message', async (message, content, ackOrNack) => {
          const data = JSON.parse(message.content.toString());
          try {
            await callback(data);
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
    } catch (err) {
      console.error(`Subscription ${subscriptionName} does not exist`, err);
    }
  }
}
