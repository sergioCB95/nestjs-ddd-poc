import { v4 as uuidv4 } from 'uuid';
import { Order } from '../aggregators/order.aggregate';
import { NewOrder } from '../aggregators/newOrder.aggregate';
import { OrderInput } from '../aggregators/orderInput.aggregate';
import { UpdateOrder } from '../aggregators/updateOrder.aggregate';
import { isNewOrderItem } from '../utils/isNewOrderItem';
import { OrderItem } from '../entities/orderItem.entity';
import { NewOrderItem } from '../entities/newOrderItem.entity';
import { OrderItemInput } from '../aggregators/orderItemInput.aggregate';

export class OrderItemFactory {
  createOrderItem = ({ id, amount, productId }: OrderItemInput): OrderItem => ({
    id,
    amount,
    productId,
  });

  createNewOrderItem = ({ amount, productId }: NewOrderItem): OrderItem =>
    this.createOrderItem({
      id: uuidv4(),
      amount,
      productId,
    });
}
