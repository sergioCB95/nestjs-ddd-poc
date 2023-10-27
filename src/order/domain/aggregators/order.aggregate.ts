import { OrderItem } from '../entities/orderItem.entity';
import { OrderStatus } from '../entities/orderStatus.entity';

export interface Order {
  id: string;
  status: OrderStatus;
  address: string | null;
  items: Array<OrderItem>;
}
