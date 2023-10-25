import {
  CustomTransportStrategy,
  Server,
  Deserializer,
} from '@nestjs/microservices';
import { RascalService } from './rascal.service';
import { isObservable } from 'rxjs';
import { InboundMessageIdentityDeserializer } from './inbound-message-entity';

export type OnMessageConfig = {
  handler: (data: any) => Promise<any>;
  data: any;
  content: any;
  ackOrNack: (err?: any, options?: any) => Promise<void>;
};

export type RascalServerOptions = {
  rascalService: RascalService;
  config: any;
  deserializer?: Deserializer;
  onMessage?: (config: OnMessageConfig) => Promise<void>;
  onSubscriptionError?: (err: any) => Promise<void>;
};

const defaultOnMessage =
  (logger) =>
  async ({ handler, data, ackOrNack }) => {
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
  private readonly config: any;
  private readonly rascalService: RascalService;
  private readonly onMessage: (config: OnMessageConfig) => Promise<void>;
  private readonly onSubscriptionError: (err: any) => Promise<void>;

  constructor({
    rascalService,
    config = {},
    deserializer,
    onMessage,
    onSubscriptionError,
  }: RascalServerOptions) {
    super();
    this.config = config;
    this.rascalService = rascalService;
    this.onMessage = onMessage ?? defaultOnMessage(this.logger);
    this.onSubscriptionError =
      onSubscriptionError ?? defaultOnSubscriptionError(this.logger);
    this.initializeDeserializer(
      deserializer ?? new InboundMessageIdentityDeserializer(),
    );
  }

  async listen(callback: () => void) {
    await this.rascalService.connect(this.config);
    for await (const [pattern, handler] of this.messageHandlers.entries()) {
      const subscription = await this.rascalService.subscribe(pattern);
      subscription
        .on('message', (message, content, ackOrNack) => {
          const data = this.deserializer.deserialize(message);
          this.onMessage({
            handler,
            data,
            content,
            ackOrNack,
          });
        })
        .on('error', this.onSubscriptionError);
      this.logger.log(`Mapped {${pattern}} subscription`);
    }
    callback();
  }

  async close() {
    await this.rascalService.shutdown();
  }
}
