import { v4 as uuidv4 } from 'uuid';
import { Order } from '../aggregators/order.aggregate';
import { OrderItemFactory } from './orderItem.factory';
import { OrderStatus } from '../entities/orderStatus.entity';

export type OrderInput = Order;

export class OrderFactory {
  orderItemFactory = new OrderItemFactory();
  createOrder = ({ id, status, items, address }: OrderInput): Order => ({
    id,
    status,
    address,
    items,
  });

  createNewOrder = (): Order =>
    this.createOrder({
      id: uuidv4(),
      status: OrderStatus.PENDING,
      address: null,
      items: [],
    });
}
