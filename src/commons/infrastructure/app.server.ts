import { RascalServer } from '../../rascal/rascal.server';
import { isObservable } from 'rxjs';
import { RascalService } from '../../rascal/rascal.service';

export class AppServer extends RascalServer {
  constructor(rascalService: RascalService, config: any = {}) {
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
      this.logger.error(err);
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

  onSubscriptionError = async (err: any) => this.logger.error(err);
}
