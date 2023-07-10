import { Order } from '../aggregators/order.aggregate';
import { Event } from '../../../commons/domain/event';
import { OrderEvents } from './order.events';

export class OrderEventFactory {
  buildOrderCreatedEvent(data: Order) {
    return new Event<Order>(OrderEvents.Created, data);
  }
}
