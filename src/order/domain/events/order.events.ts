import { Event } from '../../../commons/domain/event';
import { Order } from '../aggregators/order.aggregate';
import { OrderUpdatedTuple } from '../aggregators/orderUpdatedTuple.aggregate';

export const OrderEvents = {
  Created: 'order_created',
  Updated: 'order_updated',
};

export class OrderCreatedEvent extends Event<Order> {
  constructor(data: Order) {
    super(OrderEvents.Created, data);
  }
}

export class OrderUpdatedEvent extends Event<OrderUpdatedTuple> {
  constructor(data: OrderUpdatedTuple) {
    super(OrderEvents.Updated, data);
  }
}
