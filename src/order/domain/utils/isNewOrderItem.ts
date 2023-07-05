import { OrderItem } from '../entities/orderItem.entity';
import { NewOrderItem } from '../entities/newOrderItem.entity';

export const isNewOrderItem = (
  orderItem: OrderItem | NewOrderItem,
): orderItem is NewOrderItem => (orderItem as OrderItem).id === undefined;
