import { v4 as uuidv4 } from 'uuid';
import { Order } from '../aggregators/order.aggregate';
import { NewOrder } from '../aggregators/newOrder.aggregate';
import { UpdatedOrder } from '../aggregators/updatedOrder.aggregate';
import { isNewOrderItem } from '../utils/isNewOrderItem';
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

  createNewOrder = (newOrder: NewOrder): Order =>
    this.createOrder({
      id: uuidv4(),
      status: OrderStatus.PENDING,
      address: null,
      items: newOrder.items.map(this.orderItemFactory.createNewOrderItem),
    });

  createUpdatedOrder = (updatedOrder: UpdatedOrder): Order =>
    this.createOrder({
      id: updatedOrder.id,
      status: updatedOrder.status,
      address: updatedOrder.address,
      items: updatedOrder.items.map((item) =>
        isNewOrderItem(item)
          ? this.orderItemFactory.createNewOrderItem(item)
          : item,
      ),
    });
}
