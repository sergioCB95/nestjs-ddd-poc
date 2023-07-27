import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from '../entities/orderItem.entity';
import { NewOrderItem } from '../entities/newOrderItem.entity';

export type OrderItemInput = OrderItem;

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
