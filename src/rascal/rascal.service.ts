import { BrokerAsPromised as Broker } from 'rascal';
import { Logger } from '@nestjs/common';

export abstract class RascalService {
  broker: Broker;
  protected readonly logger = new Logger(RascalService.name);

  abstract brokerSetUp(): Promise<void>;
  abstract onConnectionError(err: any): Promise<void>;

  async connect(config: any = {}): Broker {
    this.broker = await Broker.create(config);
    this.broker.on('error', this.onConnectionError);
    await this.brokerSetUp();
    this.logger.log(`Rascal broker stablished`);
    return this.broker;
  }

  async shutdown() {
    await this.broker.shutdown();
    this.logger.log(`Rascal broker shutdown`);
  }

  async publish(event: string, message: any) {
    this.logger.verbose(`Publishing message to {${event}}`);
    return await this.broker.publish(event, message);
  }

  async subscribe(event: string) {
    this.logger.verbose(`Subscribing to {${event}}`);
    return this.broker.subscribe(event);
  }
}
