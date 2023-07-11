import { Order } from '../aggregators/order.aggregate';
import { OrderEvents } from './order.events';
import { OrderUpdatedTuple } from '../aggregators/orderUpdatedTuple.aggregate';
import { AbstractEventFactory } from '../../../commons/domain/abstract.event.factory';

export class OrderCreatedEventFactory extends AbstractEventFactory<Order> {
  eventName = OrderEvents.Created;
}

export class OrderUpdatedEventFactory extends AbstractEventFactory<OrderUpdatedTuple> {
  eventName = OrderEvents.Updated;
}
