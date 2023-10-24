import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { RascalService } from './rascal.service';
import { BrokerAsPromised as Broker } from 'rascal';
import { isObservable } from 'rxjs';

export type OnMessageConfig = {
  handler: (data: any) => Promise<any>;
  message: any;
  content: any;
  ackOrNack: (err?: any, options?: any) => Promise<void>;
};

export type RascalServerOptions = {
  onMessage?: (config: OnMessageConfig) => Promise<void>;
  onSubscriptionError?: (err: any) => Promise<void>;
};

const defaultOnMessage =
  (logger) =>
  async ({ handler, message, ackOrNack }) => {
    const data = JSON.parse(message.content.toString());
    try {
      const streamOrResult = await handler(data);
      if (isObservable(streamOrResult)) {
        streamOrResult.subscribe();
      }
      ackOrNack();
    } catch (err) {
      logger.error(err);
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

const defaultOnSubscriptionError = (logger) => async (err: any) =>
  logger.error(err);

export class RascalServer extends Server implements CustomTransportStrategy {
  protected broker: Broker;
  private onMessage: (config: OnMessageConfig) => Promise<void>;
  private onSubscriptionError: (err: any) => Promise<void>;

  constructor(
    private readonly rascalService: RascalService,
    private readonly config: any = {},
    { onMessage, onSubscriptionError }: RascalServerOptions = {},
  ) {
    super();
    this.config = config;
    this.rascalService = rascalService;
    this.onMessage = onMessage ?? defaultOnMessage(this.logger);
    this.onSubscriptionError =
      onSubscriptionError ?? defaultOnSubscriptionError(this.logger);
  }

  async listen(callback: () => void) {
    await this.rascalService.connect(this.config);
    for await (const [pattern, handler] of this.messageHandlers.entries()) {
      const subscription = await this.rascalService.subscribe(pattern);
      subscription
        .on('message', (message, content, ackOrNack) =>
          this.onMessage({ handler, message, content, ackOrNack }),
        )
        .on('error', this.onSubscriptionError);
      this.logger.log(`Mapped {${pattern}} subscription`);
    }
    callback();
  }

  async close() {
    await this.rascalService.shutdown();
  }
}
