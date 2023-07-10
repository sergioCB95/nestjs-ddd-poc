import { v4 as uuidv4 } from 'uuid';
import { Order } from '../aggregators/order.aggregate';
import { NewOrder } from '../aggregators/newOrder.aggregate';
import { OrderInput } from '../aggregators/orderInput.aggregate';
import { UpdateOrder } from '../aggregators/updateOrder.aggregate';
import { isNewOrderItem } from '../utils/isNewOrderItem';
import { OrderItemFactory } from './orderItem.factory';
import { OrderStatus } from '../entities/orderStatus.entity';

export class OrderFactory {
  orderItemFactory = new OrderItemFactory();
  createOrder = ({ id, status, items }: OrderInput): Order => ({
    id,
    status,
    items,
  });

  createNewOrder = (newOrder: NewOrder): Order =>
    this.createOrder({
      id: uuidv4(),
      status: OrderStatus.PENDING,
      items: newOrder.items.map(this.orderItemFactory.createNewOrderItem),
    });

  createUpdatedOrder = (updatedOrder: UpdateOrder): Order =>
    this.createOrder({
      id: updatedOrder.id,
      status: updatedOrder.status,
      items: updatedOrder.items.map((item) =>
        isNewOrderItem(item)
          ? this.orderItemFactory.createNewOrderItem(item)
          : item,
      ),
    });
}
