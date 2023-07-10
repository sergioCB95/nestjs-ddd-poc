import { AmqpService } from '../../commons/infrastructure/amqp.service';
import { EventObserver } from '../../commons/domain/event.observer';
import { Injectable } from '@nestjs/common';
import { OrderEvents } from '../domain/events/order.events';

@Injectable()
export class OrderPublisher {
  constructor(
    private readonly amqpService: AmqpService,
    private readonly eventObserver: EventObserver,
  ) {}

  async onApplicationBootstrap() {
    this.eventObserver.subscribe(OrderEvents.Created, async (order) => {
      await this.amqpService.publish(OrderEvents.Created, order);
    });
  }
}
