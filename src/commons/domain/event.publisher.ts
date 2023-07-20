import { Event } from './event';

export interface IntegrationEventConfig {
  eventName: string;
  mappingFunction?: (data: any) => any;
}

export abstract class EventPublisher {
  abstract eventMap: { [key: string]: IntegrationEventConfig };
  abstract publishEvent(eventName: string, data: any): Promise<void>;

  publish(event: Event<any>): Promise<void> {
    const integrationEventConfig = this.eventMap[event.name];
    if (!integrationEventConfig) {
      throw new Error(`Event ${event.name} is not configured`);
    }
    const integrationEventData = integrationEventConfig.mappingFunction
      ? integrationEventConfig.mappingFunction(event.data)
      : event.data;
    return this.publishEvent(
      integrationEventConfig.eventName,
      integrationEventData,
    );
  }
}