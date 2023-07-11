import { AmqpService } from '../../commons/infrastructure/amqp.service';
import { EventBus } from '../../commons/domain/event.bus';
import { Injectable } from '@nestjs/common';
import { OrderEvents } from '../domain/events/order.events';
import { Order } from '../domain/aggregators/order.aggregate';
import { OrderUpdatedTuple } from '../domain/aggregators/orderUpdatedTuple.aggregate';

@Injectable()
export class OrderPublisher {
  constructor(
    private readonly amqpService: AmqpService,
    private readonly eventBus: EventBus,
  ) {}

  async onApplicationBootstrap() {
    this.eventBus.subscribe<Order>(OrderEvents.Created, async (order) => {
      await this.amqpService.publish(OrderEvents.Created, order);
    });

    this.eventBus.subscribe<OrderUpdatedTuple>(
      OrderEvents.Updated,
      async (orderUpdatedTuple) => {
        await this.amqpService.publish(OrderEvents.Updated, orderUpdatedTuple);
      },
    );
  }
}
