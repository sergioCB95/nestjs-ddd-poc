import { Event } from './event';
import { Observable, Subscriber } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventObserver {
  private events: Observable<Event<any>>;
  private eventsObserver: Subscriber<Event<any>>;

  constructor() {
    this.events = new Observable<Event<any>>((observer) => {
      this.eventsObserver = observer;
    });
  }

  public publish<T>(event: Event<T>): void {
    this.eventsObserver.next(event);
  }

  public subscribe<T>(eventName: string, callback: (data: T) => void): void {
    this.events
      .pipe(filter((event) => event.name === eventName))
      .subscribe((event) => callback(event.data));
  }
}
