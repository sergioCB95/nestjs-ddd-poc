import { RascalServer } from './rascal.server';
import { isObservable } from 'rxjs';
import { BaseRascalService } from './base.rascal.service';

export class AppServer extends RascalServer {
  constructor(rascalService: BaseRascalService, config: any = {}) {
    super(rascalService, config);
  }

  onMessage = async ({ handler, message, ackOrNack }) => {
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
  };

  onSubscriptionError = async (err: any) => console.error(err);
}
