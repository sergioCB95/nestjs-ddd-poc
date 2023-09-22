import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { BaseRascalService } from './base.rascal.service';
import { BrokerAsPromised as Broker } from 'rascal';
import { Logger } from '@nestjs/common';

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
  private readonly _logger = new Logger(RascalServer.name);

  constructor(
    private readonly rascalService: BaseRascalService,
    private readonly config: any = {},
  ) {
    super();
    this.config = config;
    this.rascalService = rascalService;
  }
  abstract onMessage: (config: OnMessageConfig) => Promise<void>;
  abstract onSubscriptionError: (err: any) => Promise<void>;

  async listen(callback: () => void) {
    await this.rascalService.createBroker(this.config);
    await this.rascalService.brokerSetUp();
    for await (const [pattern, handler] of this.messageHandlers.entries()) {
      const subscription = await this.rascalService.subscribe(pattern);
      subscription
        .on('message', (message, content, ackOrNack) =>
          this.onMessage({ handler, message, content, ackOrNack }),
        )
        .on('error', this.onSubscriptionError);
      this._logger.log(`Mapped {${pattern}} subscription`);
    }
    callback();
  }

  async close() {
    await this.rascalService.shutdown();
  }
}
