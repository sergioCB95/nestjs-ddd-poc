import { BrokerAsPromised as Broker } from 'rascal';
import { Logger } from '@nestjs/common';

export type RascalServiceOptions = {
  brokerSetUp?: () => Promise<void>;
  onConnectionError?: (err: any) => Promise<void>;
};

const defaultBrokerSetUp = (logger) => async () => {
  logger.debug('Running default broker setup');
};

const defaultOnConnectionError = (logger) => async (err: any) => {
  logger.error('Rascal connection error', err);
};
export class RascalService {
  broker: Broker;
  protected readonly logger = new Logger(RascalService.name);
  brokerSetUp: () => Promise<void>;
  onConnectionError: (err: any) => Promise<void>;

  constructor({ brokerSetUp, onConnectionError }: RascalServiceOptions = {}) {
    this.brokerSetUp = brokerSetUp ?? defaultBrokerSetUp(this.logger);
    this.onConnectionError =
      onConnectionError ?? defaultOnConnectionError(this.logger);
  }

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
