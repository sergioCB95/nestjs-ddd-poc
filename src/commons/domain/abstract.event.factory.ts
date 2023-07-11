import { Event } from './event';

export abstract class AbstractEventFactory<T> {
  abstract eventName: string;
  build(data: T): Event<T> {
    return new Event<T>(this.eventName, data);
  }
}
