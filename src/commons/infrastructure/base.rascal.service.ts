import { BrokerAsPromised as Broker } from 'rascal';

export abstract class BaseRascalService {
  protected broker: Broker;

  abstract brokerSetUp(): Promise<void>;

  async createBroker(config: any = {}): Broker {
    this.broker = await Broker.create(config);
  }

  async publish(event: string, message: any) {
    return this.broker.publish(event, message);
  }

  async subscribe(event: string) {
    return this.broker.subscribe(event);
  }
}
