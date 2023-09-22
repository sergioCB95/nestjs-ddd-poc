import { BrokerAsPromised as Broker } from 'rascal';
import { Logger } from '@nestjs/common';

export abstract class BaseRascalService {
  broker: Broker;
  private readonly _logger = new Logger(BaseRascalService.name);

  abstract brokerSetUp(): Promise<void>;

  async createBroker(config: any = {}): Broker {
    this.broker = await Broker.create(config);
    this._logger.log(`Rascal broker stablished`);
  }

  async shutdown() {
    await this.broker.shutdown();
    this._logger.log(`Rascal broker shutdown`);
  }

  async publish(event: string, message: any) {
    this._logger.verbose(`Publishing message to {${event}}`);
    return this.broker.publish(event, message);
  }

  async subscribe(event: string) {
    this._logger.verbose(`Subscribing to {${event}}`);
    return this.broker.subscribe(event);
  }
}
