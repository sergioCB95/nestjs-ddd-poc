import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { RascalService } from './rascal.service';
import { BrokerAsPromised as Broker } from 'rascal';

export interface OnMessageConfig {
  handler: (data: any) => Promise<any>;
  message: any;
  content: any;
  ackOrNack: (err?: any, options?: any) => Promise<void>;
}
export abstract class RascalServer
  extends Server
  implements CustomTransportStrategy
{
  protected broker: Broker;

  constructor(
    private readonly rascalService: RascalService,
    private readonly config: any = {},
  ) {
    super();
    this.config = config;
    this.rascalService = rascalService;
  }
  abstract onMessage: (config: OnMessageConfig) => Promise<void>;
  abstract onSubscriptionError: (err: any) => Promise<void>;

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
